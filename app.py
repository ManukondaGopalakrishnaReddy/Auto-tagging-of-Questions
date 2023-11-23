from flask import Flask, render_template, request
import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multiclass import OneVsRestClassifier
from sklearn.svm import LinearSVC

app = Flask(__name__)

# Define the path to the "Models" folder
models_folder = os.path.join(os.getcwd(), 'Models')

# Load the models
with open(os.path.join(models_folder, 'Taxonomy_model.pkl'), 'rb') as file1:
    model1 = pickle.load(file1)

with open(os.path.join(models_folder, 'Difficulty_model.pkl'), 'rb') as file2:
    model2 = pickle.load(file2)

with open(os.path.join(models_folder, 'Category_model.pkl'), 'rb') as file3:
    model3 = pickle.load(file3)

with open(os.path.join(models_folder, 'Sub_Category_model.pkl'), 'rb') as file4:
    model4 = pickle.load(file4)



# Define the home route
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index')
def index():
    return render_template('index.html')

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    # Get the input question from the form
    question = request.form['question']
    if question.strip() == '':
        return render_template('index.html', message='Please enter question.')
    predicted_taxonomy = model1.predict([question])
    predicted_category=model3.predict([question])
    predicted_difficulty=model2.predict([question])
    predicted_subCategory=model4.predict([question])

    
    list=[predicted_taxonomy[0],predicted_difficulty[0],predicted_category[0],predicted_subCategory[0]]

 
    return render_template('result.html',Question=question,Predicted_Taxonomy=list[0],Predicted_category=list[2],Predicted_Difficulty=list[1],Predicted_subCategory=list[3])
if __name__ == '__main__':
    app.run(debug=True)
