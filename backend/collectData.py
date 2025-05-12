import cv2
import mediapipe as mp
import pandas as pd
import string
import os


csv_path = "asl_landmarks.csv"
num_landmarks = 21
coords_per_landmark = 3
total_features = num_landmarks * coords_per_landmark
column_names = [str(i) for i in range(total_features)] + ["label"]

# Setup MediaPipe
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
cap = cv2.VideoCapture(0)

all_data = []

for letter in string.ascii_uppercase:
    print(f"\nCollecting data for: {letter}")
    print("Press 's' to save a sample, 'q' to skip to next letter")

    sample_count = 0
    while True:
        ret, frame = cap.read()
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb)

        if results.multi_hand_landmarks:
            for hand in results.multi_hand_landmarks:
                mp.solutions.drawing_utils.draw_landmarks(
                    frame, hand, mp_hands.HAND_CONNECTIONS
                )
                cv2.putText(frame, f"Letter: {letter}, Samples: {sample_count}", (10, 30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        cv2.imshow("Collecting Data", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord('s') and results.multi_hand_landmarks:
            hand_landmarks = results.multi_hand_landmarks[0]
            flat = [coord for lm in hand_landmarks.landmark for coord in (lm.x, lm.y, lm.z)]
            if len(flat) == total_features:
                flat.append(letter)
                all_data.append(flat)
                sample_count += 1
            else:
                print("Incomplete landmark data, sample skipped.")

        if key == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()


df = pd.DataFrame(all_data, columns=column_names)


file_exists = os.path.exists(csv_path)
if file_exists:
    with open(csv_path, "ab+") as f:
        f.seek(-1, os.SEEK_END)
        last_byte = f.read(1)
        if last_byte != b'\n':
            f.write(b'\n')


df.to_csv(csv_path, mode='a', index=False, header=not file_exists)
print("✅ Data appended to asl_landmarks.csv")
