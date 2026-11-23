import os
import json
import subprocess
import requests
import io
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed

MEDIA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'media')
os.makedirs(MEDIA_DIR, exist_ok=True)

ITEMS = [
    # A. Videos (2 looping 16:9)
    {
        "filename": "hero-power-grid.mp4",
        "type": "video",
        "model": "gemini_omni_flash_1_2",
        "prompt": "Slow cinematic aerial tracking shot of a modern high-voltage electrical substation and power infrastructure at blue-hour dusk, crisp emerald-teal and warm amber architectural lighting, seamless loop, corporate documentary, photorealistic, no text, no watermark",
        "aspect_ratio": "16:9",
        "duration": 8,
        "resolution": "720p",
    },
    {
        "filename": "ingenierie-workshop.mp4",
        "type": "video",
        "model": "gemini_omni_flash_1_2",
        "prompt": "Slow dolly shot inside a spotless modern electrical engineering workshop showing precision copper busbars, industrial TGBT switchboard wiring, and an engineer inspecting schematics on a tablet, high-contrast editorial lighting, clean industrial aesthetics, no text, no watermark",
        "aspect_ratio": "16:9",
        "duration": 8,
        "resolution": "720p",
    },

    # B. Entity & Editorial Photography (7 high-res stills)
    {
        "filename": "card-ingenierie.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Dramatic architectural photo of a modern 22 kV HTA transformer substation and medium-voltage switchgear cells, clean industrial lighting, subtle emerald-teal grade, architectural photography, hyper-detailed, no text, no watermark",
        "aspect_ratio": "3:4",
        "resolution": "2k",
    },
    {
        "filename": "card-solutions.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Contemporary Moroccan corporate office and showroom interior featuring integrated architectural LED lighting, discreet smart-building CCTV and access control, glass conference room, cool royal-blue dusk accents, architectural interior photography, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "card-retail.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "High-end studio-lit composition of neatly arranged medium-voltage power cables with cross-section showing copper conductors, compact industrial circuit breakers, and ceramic composite insulators on a dark slate architectural surface, architectural catalog photography, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "lifecycle-atelier.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Close-up editorial photograph of custom industrial automation PLC cabinet wiring, neatly bundled cables, DIN rails, and precision copper busbars, crisp depth of field, industrial workshop, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "lifecycle-automation.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Modern industrial control room HMI touchscreen displaying clean SCADA electrical telemetry graphs inside a manufacturing facility, clean technical environment, professional industrial automation, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "solutions-security.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Minimalist architectural shot of a modern RFID biometric access control reader and sleek dome CCTV camera integrated into a clean concrete-and-glass corporate lobby, subtle royal blue ambient light, modern architecture, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "team-philosophy.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Editorial wide shot of Moroccan electrical engineers in clean safety vests and hard hats reviewing technical blueprints together on a modern industrial site at golden hour, authentic corporate editorial, inspiring Moroccan engineering, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },

    # C. MOCOMEL Retail Category Studio Visuals (8 stills 4:3 on #F1F5F9)
    {
        "filename": "retail-cables-puissance.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of cross-section armored PRC medium-voltage and R2V copper and aluminum power cables on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-cables-signal.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of neatly coiled shielded blue and gray industrial instrumentation and signal cables EGSF EGFA LIYCY on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-ligne-hta.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of composite high-voltage electrical insulator, surge arrester parafoudre, and metallic anchoring clamps on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-poste-transfo.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of HTA plug-in bushings bornes embrochables, HTA fuses, and medium-voltage termination kit on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-cheminement.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of coiled double-wall underground electrical conduits in red orange gray and perforated metallic cable trays on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-raccordement.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of precision bimetal cable lugs cosses bimetal, DIN rails, and industrial terminal blocks on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-disjoncteurs.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of modern modular and compact industrial circuit breakers disjoncteurs compacts on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },
    {
        "filename": "retail-energie-eclairage.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean minimalist studio product photography of high-bay industrial LED luminaire paired with a modern industrial UPS power cabinet on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
        "resolution": "2k",
    },

    # D. Project Case Study Visuals (5 stills 16:9)
    {
        "filename": "project-hopital-tetouan.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Architectural photograph of a modern provincial hospital electrical substation and clean technical power distribution room, modern healthcare facility, northern Morocco architecture, professional engineering, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "project-datacenter-nador.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "High-security modern telecom datacenter exterior with 22 kV power infrastructure, modern architectural facade, Mediterranean Moroccan daylight, high tech facility, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "project-gir-safi.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Reinforced institutional electrical substation facility for Groupe d'Intervention Rapide in coastal Moroccan daylight in Safi, modern industrial utility building, architectural photography, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "project-lotissement-birjdid.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Clean urban residential development electrical distribution infrastructure and modern street grid in Bir Jdid Morocco, overhead blue sky, clean modern civil engineering, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
    {
        "filename": "project-eclairage-meknes.jpg",
        "type": "image",
        "model": "nano_banana_2_1",
        "prompt": "Wide modern Moroccan avenue illuminated at twilight by sleek architectural LED public street lighting, beautiful twilight dusk, Meknes Morocco, cinematic architectural perspective, no text, no watermark",
        "aspect_ratio": "16:9",
        "resolution": "2k",
    },
]

def generate_item(item):
    out_path = os.path.join(MEDIA_DIR, item['filename'])
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"Skipping {item['filename']} (already exists, {os.path.getsize(out_path)} bytes)")
        return True

    print(f"Starting generation for {item['filename']} ({item['model']})...")
    
    cmd = [
        "higgsfield", "generate", "create", item["model"],
        "--prompt", item["prompt"],
        "--aspect_ratio", item["aspect_ratio"],
        "--wait",
        "--json"
    ]
    if item["type"] == "video":
        cmd.extend(["--mode", "text-to-video", "--duration", str(item.get("duration", 8)), "--resolution", item.get("resolution", "720p")])
    elif item["type"] == "image":
        cmd.extend(["--resolution", item.get("resolution", "2k")])

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=600)
        if proc.returncode != 0:
            print(f"Error generating {item['filename']}: {proc.stderr.strip()[:300]}")
            return False

        raw_output = proc.stdout.strip()
        data = json.loads(raw_output)
        
        url = None
        if isinstance(data, list) and len(data) > 0:
            job = data[0]
            url = job.get("result_url") or job.get("min_result_url")
        elif isinstance(data, dict):
            url = data.get("result_url") or data.get("url")

        if not url:
            import re
            urls = re.findall(r'https?://[^\s"\'<>]+', raw_output)
            if urls:
                url = urls[-1]

        if not url:
            print(f"Could not extract URL for {item['filename']}: {raw_output[:200]}")
            return False

        print(f"Downloading {item['filename']} from {url}...")
        resp = requests.get(url, timeout=120)
        resp.raise_for_status()

        if item["filename"].endswith(".jpg") or item["filename"].endswith(".jpeg"):
            # Ensure it is saved as valid high quality JPEG
            try:
                img = Image.open(io.BytesIO(resp.content)).convert('RGB')
                img.save(out_path, 'JPEG', quality=95, optimize=True)
            except Exception as e:
                with open(out_path, 'wb') as f:
                    f.write(resp.content)
        else:
            with open(out_path, 'wb') as f:
                f.write(resp.content)

        file_size = os.path.getsize(out_path)
        print(f"Successfully saved {item['filename']} ({file_size} bytes)")
        return True
    except Exception as e:
        print(f"Exception generating {item['filename']}: {e}")
        return False

def main():
    print(f"Total items to generate: {len(ITEMS)}")
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(generate_item, item): item for item in ITEMS}
        for future in as_completed(futures):
            item = futures[future]
            try:
                success = future.result()
                print(f"Completed {item['filename']}: {'SUCCESS' if success else 'FAILED'}")
            except Exception as e:
                print(f"Worker failed for {item['filename']}: {e}")

if __name__ == "__main__":
    main()
