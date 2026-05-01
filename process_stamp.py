from PIL import Image
import numpy as np

# Load the generated image
img_path = r'C:\Users\Caleb\.gemini\antigravity\brain\269e629d-9282-4771-ac4b-2b016f53209b\caleb_postage_stamp_v3_1777582216799.png'
img = Image.open(img_path).convert('RGBA')

# Convert to numpy array
data = np.array(img)

# The background outside the stamp is likely white/cream. Let's find the bounding box of the non-background pixels.
# The dark red stamp should be distinctly different.
# Let's just find the bounding box of the dark red stamp.
# A simple way: find all pixels that are significantly dark or colored (not white/cream).
# Cream/white is usually > 200 in all RGB channels.
# Let's say background is r > 200, g > 200, b > 200
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
mask = (r > 200) & (g > 200) & (b > 200)

# Set those pixels to transparent
data[mask, 3] = 0

# Crop to the bounding box of the non-transparent pixels
non_empty_columns = np.where(mask.min(axis=0) == False)[0]
non_empty_rows = np.where(mask.min(axis=1) == False)[0]

if len(non_empty_rows) > 0 and len(non_empty_columns) > 0:
    cropBox = (min(non_empty_columns), min(non_empty_rows), max(non_empty_columns), max(non_empty_rows))
    cropped_data = data[cropBox[1]:cropBox[3]+1, cropBox[0]:cropBox[2]+1]
    result_img = Image.fromarray(cropped_data)
else:
    # If something went wrong, just save the transparent version
    result_img = Image.fromarray(data)

# The original stamp is at: C:\Users\Caleb\Downloads\calebs-3d-case-study\public\assets\img\60474834660f934090d42877_stamp-94c7c66056.png
out_path = r'C:\Users\Caleb\Downloads\calebs-3d-case-study\public\assets\img\60474834660f934090d42877_stamp-94c7c66056.png'
result_img.save(out_path)
print('Successfully processed and replaced the stamp image.')
