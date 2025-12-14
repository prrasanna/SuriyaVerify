<img width="1920" height="1080" alt="Screenshot (199)" src="https://github.com/user-attachments/assets/2bcadba9-5b5e-493a-86dc-432d809fa4ae" />
<img width="1920" height="1080" alt="Screenshot (200)" src="https://github.com/user-attachments/assets/a243d0c5-1deb-44b8-865d-1b53daa26bc1" />
<img width="1920" height="1080" alt="Screenshot (201)" src="https://github.com/user-attachments/assets/824d09f0-3534-4ecd-9567-ca9cdfa59235" />
<img width="1920" height="1080" alt="Screenshot (202)" src="https://github.com/user-attachments/assets/96ce3e3b-6e0f-4137-be4b-145981f246b9" />
<img width="1920" height="1080" alt="Screenshot (203)" src="https://github.com/user-attachments/assets/cd9c6a27-3065-4449-9fd8-94797353397e" />


🔧 Hardware Integration (Proposed)

> Note:
This project is implemented as a software-based simulation using CSV and JSON data.
The same architecture can be extended with real-time hardware integration for live rooftop solar panel monitoring.

---

🧱 Hardware Components Required

Solar Panels

Voltage Sensor

Current Sensor

Microcontroller (ESP32 / Arduino)

Solar Inverter / Charge Controller

Wi-Fi / GSM Communication Module

---

🔄 System Working (Hardware + Software)

1. Solar panels generate electrical energy from sunlight.


2. Voltage and current sensors measure electrical parameters from the panels.


3. The microcontroller collects sensor values and calculates power in kilowatts (kW).


4. The processed data is converted into JSON format.


5. Data is transmitted to the software application through Wi-Fi or cloud services.


6. The software dashboard displays power generation, panel count, and panel status.

---

⚙️ Panel Detection Logic

Each solar panel or panel string has a predefined voltage and current range.

If the measured value drops below the threshold, the panel is marked as not present or faulty.

This enables automatic fault detection without manual inspection.

---

🔮 Future Scope

Real-time IoT data streaming instead of file upload.

Direct inverter communication using RS485 / Modbus.

Mobile and web-based live monitoring system.

<img width="1024" height="1536" alt="file_00000000ef3c720890ba003c34aa17bd" src="https://github.com/user-attachments/assets/6bca5768-e69c-46e2-92c2-10aa09d0cb2b" />
