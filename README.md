# 🧠 AI Health Risk Predictor

A machine learning-powered web application that predicts the risk of **heart disease** and **muscle weakness** based on user input. Built with Flask, python,  and deployed on Render.

- ❤️ Heart Disease Risk
- 💪 Muscle Weakness Risk


---

## 🚀 Features

- 🔍 Predicts health risks based on user input
- 📊 Saves prediction history to CSV
- 🧾 View history by category (Heart or Muscle)
- 🗑️ Clear history with one click
- 🎨 Clean, responsive UI with animations

---

## 🛠️ Tech Stack

| Layer        | Tools Used                     |
|--------------|--------------------------------|
| Frontend     | HTML, CSS, Jinja2              |
| Backend      | Flask, Python                  |
| ML Models    | RandomForest, DecisionTree     |
| Data Storage | CSV (history.csv)        



## 🌐 Live Demo

👉 [Click here to try the app](https://health-risk-predictor-dmlt.onrender.com)      |

---

## 📂 Project Structure
project/ │ ├── app.py                  # Main Flask app ├── history.csv             # Stores prediction logs ├── templates/ │   ├── base.html │   ├── home.html │   ├── result.html │   ├── history.html │   └── health_tips.html ├── static/ │   └── style.css ├── models/ │   ├── heart_model.pkl │   └── muscle_model.pkl └── README.md

📌 Future Improvements
- Add login/authentication
- Export history to Excel or PDF
- Dynamic health tips based on prediction
- Deploy to Render or Vercel

🙌 Author
Built with ❤️ by [Goodness]

# health-risk-predictor- how to use it



---

## 🚀 How to Use the App

1. Visit the [Live Demo](https://health-risk-predictor-dmlt.onrender.com)
2. Choose a prediction type:
   - Heart Disease
   - Muscle Weakness
3. Fill in the form with your health data
4. Click **Predict**
5. View your result instantly
6. Navigate to **History** to:
   - View past predictions
   - Download them as a CSV
   - Clear the history if needed

---

## 🖼️ Visual Walkthrough

To visualize what the app does:
- Go to the homepage
- Submit a prediction form
- Watch the result appear on screen
- Click on **History** to see all past predictions
- Use the **Download** button to export them


---

## 🛠️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/GoodnessOni/health-risk-predictor.git
cd health-risk-predictor
