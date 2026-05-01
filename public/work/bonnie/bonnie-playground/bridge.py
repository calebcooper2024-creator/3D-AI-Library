import vgamepad as vg
import requests
import time
import sys

# This bridge script connects the AI Agent's decisions to a virtual Xbox 360 controller.
# It requires the ViGEmBus driver and the 'vgamepad' python library.

def run_bridge(api_url):
    print(f"Connecting to AI Agent at {api_url}...")
    gamepad = vg.VX360Gamepad()
    
    # Mapping of button names to vgamepad constants
    BUTTON_MAP = {
        'btn_a': vg.XUSB_BUTTON.XUSB_GAMEPAD_A,
        'btn_b': vg.XUSB_BUTTON.XUSB_GAMEPAD_B,
        'btn_x': vg.XUSB_BUTTON.XUSB_GAMEPAD_X,
        'btn_y': vg.XUSB_BUTTON.XUSB_GAMEPAD_Y,
        'lb': vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER,
        'rb': vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER,
        'btn_menu': vg.XUSB_BUTTON.XUSB_GAMEPAD_START,
        'btn_view': vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK,
        'btn_ls': vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB,
        'btn_rs': vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB,
        'dpad_up': vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP,
        'dpad_down': vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN,
        'dpad_left': vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT,
        'dpad_right': vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT,
    }

    try:
        while True:
            try:
                response = requests.get(api_url, timeout=1)
                if response.status_code == 200:
                    data = response.json()
                    
                    # Joysticks (float -1.0 to 1.0)
                    gamepad.left_joystick_float(x=data.get('ls_x', 0), y=data.get('ls_y', 0))
                    gamepad.right_joystick_float(x=data.get('rs_x', 0), y=data.get('rs_y', 0))
                    
                    # Triggers (float 0.0 to 1.0)
                    gamepad.left_trigger_float(value=data.get('lt', 0))
                    gamepad.right_trigger_float(value=data.get('rt', 0))
                    
                    # Buttons
                    for key, button in BUTTON_MAP.items():
                        if data.get(key, False):
                            gamepad.press_button(button)
                        else:
                            gamepad.release_button(button)
                    
                    gamepad.update()
                else:
                    print(f"Error: Received status code {response.status_code}")
            except requests.exceptions.RequestException as e:
                print(f"Connection error: {e}")
            
            # Anti-detection: Variable polling rate
            time.sleep(0.01) 
            
    except KeyboardInterrupt:
        print("\nBridge stopped by user.")

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000/api/actions"
    run_bridge(url)
