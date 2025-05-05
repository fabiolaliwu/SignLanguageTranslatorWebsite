import cv2
import mediapipe as mp
import pandas as pd
import string

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1)
cap = cv2.VideoCapture(0)

all_data = []
all_labels = []

# Loop through letters A to Z
for letter in string.ascii_uppercase:
    print(f"\nCollecting data for: {letter}")
    print("Press 's' to save a sample, 'q' to skip to next letter")

    sample_count = 0
    while True:
        ret, frame = cap.read()
        frame = cv2.flip(frame, 1)
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
            all_data.append(flat)
            all_labels.append(letter)
            sample_count += 1

        if key == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()

# Save to CSV
df = pd.DataFrame(all_data)
df['label'] = all_labels
df.to_csv("landmarks.csv", index=False)
print("✅ Data saved to landmarks.csv")
