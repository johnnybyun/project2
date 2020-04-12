# iHeartJavascript

import numpy as np

from flask import Flask, render_template, jsonify, redirect

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

# create the Flask app.
app = Flask(__name__)


# Database setup
# create connection to sqlite datbase and pull in the data
engine = create_engine("sqlite:///heart_database.sqlite")
list_of_tuples = engine.execute('SELECT*FROM participants').fetchall()

# we convert the list of tuples to a list of lists which can be jsonified
res = [list(ele) for ele in list_of_tuples]
list = res
# // Fill each of the above arrays with randomly generated data
# // These are the column headers of our json data
# // column 1 = age (participant's age)
# // column 2 = sex (1 = male, 0 = female)
# // column 3 = cp (chest pain type: 0 = asymptomatic, 1 = atypical angina, 2 = non-anginal pain, 3 = typical angina)
# // column 4 = trestbps (resting blood pressure)
# // column 5 = chol (serum cholesterol)
# // column 6 = fbs (fasting blood sugar 1 = true, 0 = false)
# // column 7 = restecg (resting ecg: 0 = definite left ventricuar hypertrophy, 1 = normal, 2 = ST - T wave abmormality)
# // column 8 = thalach
# // column 9 = exang
# // column 10 = oldpeak
# // column 11 = slope
# // column 12 = ca
# // column 13 = thal (1 = fixed defect, 2 = normal, 3 = reveresible defect)
# // column 14 = target (1 = no disease, 2 = disease)


# pie chart data
list1 = {
    'us': {
        'Spotify': 19,
        'Soundcloud': 5,
        'Pandora': 8,
        'Itunes': 30
    },

    'uk': {
        'Spotify': 10,
        'Soundcloud': 2,
        'Pandora': 22,
        'Itunes': 37
    },

    'canada': {
        'Spotify': 14,
        'Soundcloud': 2,
        'Pandora': 5,
        'Itunes': 15
    }
};


list2 = {
    'men': {
        'asymptomatic': 0,
        'atypical angina': 0,
        'non-anginal pain': 0,
        'typical angina': 0
    },
    'women': {
        'asymptomatic': 0,
        'atypical angina': 0,
        'non-anginal pain': 0,
        'typical angina': 0
    }
}

for each in res:
    if each[2] == 1:
        if each[3] == 0:
            list2['men']['asymptomatic'] += 1
        elif each[3] == 1:
            list2['men']['atypical angina'] += 1
        elif each[3] == 2:
            list2['men']['non-anginal pain'] += 1
        elif each[3] == 3:
            list2['men']['typical angina'] += 1
    else:
        if each[3] == 0:
            list2['women']['asymptomatic'] += 1
        elif each[3] == 1:
            list2['women']['atypical angina'] += 1
        elif each[3] == 2:
            list2['women']['non-anginal pain'] += 1
        elif each[3] == 3:
            list2['women']['typical angina'] += 1


@app.route("/")
def index():
    return render_template("index.html", list=list)


@app.route("/gender")
def gender():
    return jsonify(list)


@app.route("/pie")
def pie():
    return jsonify(list1)
    # return jsonify(samples_cols_list[1:])


@app.route("/listem")
def listem():

    return jsonify(list2)
    # return jsonify(samples_cols_list[1:])


if __name__ == "__main__":
    app.run(debug=True)
