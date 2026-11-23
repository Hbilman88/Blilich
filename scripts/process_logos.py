import os
from PIL import Image
import numpy as np

def process_logo(input_path, output_color_path, output_white_path, padding=30):
    img = Image.open(input_path).convert('RGBA')
    arr = np.array(img, dtype=np.float32)

    # Detect content by checking distance from pure white (255, 255, 255)
    rgb = arr[:, :, :3]
    diff_from_white = np.max(255 - rgb, axis=2)
    mask = diff_from_white > 15  # Pixels that are clearly not white

    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]

    if not len(rows) or not len(cols):
        print(f"Error: no content found in {input_path}")
        return

    ymin = max(0, rows[0] - padding)
    ymax = min(arr.shape[0], rows[-1] + padding)
    xmin = max(0, cols[0] - padding)
    xmax = min(arr.shape[1], cols[-1] + padding)

    # Crop array
    cropped = arr[ymin:ymax, xmin:xmax].copy()
    c_rgb = cropped[:, :, :3]

    # Calculate clean alpha channel with un-premultiplied de-halo
    # Pure white = 0 alpha, colored content = 255 alpha
    # For antialiased edges on white:
    # observed_color = foreground * alpha + 255 * (1 - alpha)
    # alpha = 1 - (min(R,G,B) / 255)
    # Let's compute smooth alpha:
    min_val = np.min(c_rgb, axis=2)
    # For dark or colored pixels, min_val is much lower than 255
    # For pure white pixels, min_val is near 255
    # Smooth step between 248 and 255
    alpha = np.clip((252.0 - min_val) / (252.0 - 200.0) * 255.0, 0.0, 255.0)

    # Any pixel where diff_from_white > 20 should have at least proportional alpha
    alpha = np.maximum(alpha, np.clip(diff_from_white[ymin:ymax, xmin:xmax] * 3.0, 0.0, 255.0))
    # Threshold tiny noise
    alpha[alpha < 8.0] = 0.0
    alpha[alpha > 248.0] = 255.0

    # Clean RGB for non-zero alpha by removing white background tint:
    # fg = (c_rgb - 255 * (1 - a)) / a
    a_norm = np.clip(alpha / 255.0, 0.01, 1.0)[:, :, np.newaxis]
    unblended_rgb = np.clip((c_rgb - 255.0 * (1.0 - a_norm)) / a_norm, 0.0, 255.0)

    # Assemble color PNG
    color_arr = np.zeros_like(cropped, dtype=np.uint8)
    color_arr[:, :, :3] = unblended_rgb.astype(np.uint8)
    color_arr[:, :, 3] = alpha.astype(np.uint8)

    color_img = Image.fromarray(color_arr, 'RGBA')
    color_img.save(output_color_path, 'PNG', optimize=True)
    print(f"Saved: {output_color_path} (size: {color_img.size})")

    # Assemble white silhouette PNG for dark mode / footer
    white_arr = np.zeros_like(cropped, dtype=np.uint8)
    white_arr[:, :, :3] = 255
    white_arr[:, :, 3] = alpha.astype(np.uint8)

    white_img = Image.fromarray(white_arr, 'RGBA')
    white_img.save(output_white_path, 'PNG', optimize=True)
    print(f"Saved: {output_white_path} (size: {white_img.size})")

# Process the three logos
process_logo('20394_MOCOMEL_DY-01 (1).jpg', 'public/logos/logo-mocomel.png', 'public/logos/logo-mocomel-white.png')
process_logo('MOCOMEL SOLUTIONS.jpg', 'public/logos/logo-solutions.png', 'public/logos/logo-solutions-white.png')
process_logo('MOCOMEL Retail.jpg', 'public/logos/logo-retail.png', 'public/logos/logo-retail-white.png')
