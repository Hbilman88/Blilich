import os
import json
import subprocess
import requests
import io
from PIL import Image
from concurrent.futures import ThreadPoolExecutor, as_completed

MEDIA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'public', 'media')
os.makedirs(MEDIA_DIR, exist_ok=True)
HIGGSFIELD_BIN = r'C:\Users\ayoub\AppData\Roaming\npm\higgsfield.cmd'

IMAGES = [
    # B. Entity & Editorial Photography
    {
        "filename": "card-solutions.jpg",
        "prompt": "Contemporary Moroccan corporate office and showroom interior featuring integrated architectural LED lighting, discreet smart-building CCTV and access control, glass conference room, cool royal-blue dusk accents, architectural interior photography, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "card-retail.jpg",
        "prompt": "High-end studio-lit composition of neatly arranged medium-voltage power cables with cross-section showing copper conductors, compact industrial circuit breakers, and ceramic composite insulators on a dark slate architectural surface, architectural catalog photography, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "lifecycle-atelier.jpg",
        "prompt": "Close-up editorial photograph of custom industrial automation PLC cabinet wiring, neatly bundled cables, DIN rails, and precision copper busbars, crisp depth of field, industrial workshop, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "lifecycle-automation.jpg",
        "prompt": "Modern industrial control room HMI touchscreen displaying clean SCADA electrical telemetry graphs inside a manufacturing facility, clean technical environment, professional industrial automation, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "solutions-security.jpg",
        "prompt": "Minimalist architectural shot of a modern RFID biometric access control reader and sleek dome CCTV camera integrated into a clean concrete-and-glass corporate lobby, subtle royal blue ambient light, modern architecture, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "team-philosophy.jpg",
        "prompt": "Editorial wide shot of Moroccan electrical engineers in clean safety vests and hard hats reviewing technical blueprints together on a modern industrial site at golden hour, authentic corporate editorial, inspiring Moroccan engineering, no text, no watermark",
        "aspect_ratio": "16:9",
    },

    # C. MOCOMEL Retail Category Studio Visuals (8 stills 4:3 on #F1F5F9)
    {
        "filename": "retail-cables-puissance.jpg",
        "prompt": "Clean minimalist studio product photography of cross-section armored PRC medium-voltage and R2V copper and aluminum power cables on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-cables-signal.jpg",
        "prompt": "Clean minimalist studio product photography of neatly coiled shielded blue and gray industrial instrumentation and signal cables EGSF EGFA LIYCY on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-ligne-hta.jpg",
        "prompt": "Clean minimalist studio product photography of composite high-voltage electrical insulator, surge arrester parafoudre, and metallic anchoring clamps on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-poste-transfo.jpg",
        "prompt": "Clean minimalist studio product photography of HTA plug-in bushings bornes embrochables, HTA fuses, and medium-voltage termination kit on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-cheminement.jpg",
        "prompt": "Clean minimalist studio product photography of coiled double-wall underground electrical conduits in red orange gray and perforated metallic cable trays on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-raccordement.jpg",
        "prompt": "Clean minimalist studio product photography of precision bimetal cable lugs cosses bimetal, DIN rails, and industrial terminal blocks on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-disjoncteurs.jpg",
        "prompt": "Clean minimalist studio product photography of modern modular and compact industrial circuit breakers disjoncteurs compacts on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },
    {
        "filename": "retail-energie-eclairage.jpg",
        "prompt": "Clean minimalist studio product photography of high-bay industrial LED luminaire paired with a modern industrial UPS power cabinet on a uniform light grey background #F1F5F9, soft diffused top lighting, precision industrial catalog, no clutter, no text, no watermark",
        "aspect_ratio": "4:3",
    },

    # D. Project Case Study Visuals (5 stills 16:9)
    {
        "filename": "project-hopital-tetouan.jpg",
        "prompt": "Architectural photograph of a modern provincial hospital electrical substation and clean technical power distribution room, modern healthcare facility, northern Morocco architecture, professional engineering, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "project-datacenter-nador.jpg",
        "prompt": "High-security modern telecom datacenter exterior with 22 kV power infrastructure, modern architectural facade, Mediterranean Moroccan daylight, high tech facility, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "project-gir-safi.jpg",
        "prompt": "Reinforced institutional electrical substation facility for Groupe d'Intervention Rapide in coastal Moroccan daylight in Safi, modern industrial utility building, architectural photography, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "project-lotissement-birjdid.jpg",
        "prompt": "Clean urban residential development electrical distribution infrastructure and modern street grid in Bir Jdid Morocco, overhead blue sky, clean modern civil engineering, no text, no watermark",
        "aspect_ratio": "16:9",
    },
    {
        "filename": "project-eclairage-meknes.jpg",
        "prompt": "Wide modern Moroccan avenue illuminated at twilight by sleek architectural LED public street lighting, beautiful twilight dusk, Meknes Morocco, cinematic architectural perspective, no text, no watermark",
        "aspect_ratio": "16:9",
    },
]

def generate_image(item):
    out_path = os.path.join(MEDIA_DIR, item['filename'])
    if os.path.exists(out_path) and os.path.getsize(out_path) > 1000:
        print(f"Skipping {item['filename']} (exists, {os.path.getsize(out_path)} bytes)")
        return True

    print(f"Generating {item['filename']}...")
    cmd = [
        HIGGSFIELD_BIN, "generate", "create", "nano_banana_2_1",
        "--prompt", item["prompt"],
        "--aspect_ratio", item["aspect_ratio"],
        "--resolution", "2k",
        "--wait",
        "--json"
    ]
    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=300, shell=True)
        if proc.returncode != 0:
            print(f"Failed {item['filename']}: {proc.stderr[:200]}")
            return False

        data = json.loads(proc.stdout.strip())
        url = None
        if isinstance(data, list) and len(data) > 0:
            url = data[0].get("result_url") or data[0].get("min_result_url")
        elif isinstance(data, dict):
            url = data.get("result_url")

        if not url:
            import re
            urls = re.findall(r'https?://[^\s"\'<>]+', proc.stdout)
            if urls:
                url = urls[-1]

        if not url:
            print(f"No URL for {item['filename']}")
            return False

        resp = requests.get(url, timeout=90)
        resp.raise_for_status()

        img = Image.open(io.BytesIO(resp.content)).convert('RGB')
        img.save(out_path, 'JPEG', quality=95, optimize=True)
        print(f"Saved {item['filename']} ({os.path.getsize(out_path)} bytes, size={img.size})")
        return True
    except Exception as e:
        print(f"Error {item['filename']}: {e}")
        return False

def main():
    print(f"Starting generation of {len(IMAGES)} images with 4 parallel workers...")
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = {executor.submit(generate_image, item): item for item in IMAGES}
        for future in as_completed(futures):
            item = futures[future]
            try:
                res = future.result()
            except Exception as e:
                print(f"Worker exception on {item['filename']}: {e}")

if __name__ == "__main__":
    main()
