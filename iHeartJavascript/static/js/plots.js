//iHeartJavascript app.js file
var url = 'http://127.0.0.1:5000/gender';

// Function for Unpacking API Data
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

// Fill each of the above arrays with randomly generated data
// These are the column headers of our json data
// column 1 = age (participant's age)
// column 2 = sex (1 = male, 0 = female)
// column 3 = cp (chest pain type: 0 = asymptomatic, 1 = typical angina, 2 = non-anginal pain, 3 = typical angina)
// column 4 = trestbps (resting blood pressure)
// column 5 = chol (serum cholesterol)
// column 6 = fbs (fasting blood sugar 1 = true, 0 = false)
// column 7 = restecg (resting ecg: 0 = definite left ventricuar hypertrophy, 1 = normal, 2 = ST - T wave abmormality)
// column 8 = thalach
// column 9 = exang
// column 10 = oldpeak
// column 11 = slope
// column 12 = ca
// column 13 = thal (1 = fixed defect, 2 = normal, 3 = reveresible defect)
// column 14 = target (1 = no disease, 2 = disease)

function buildPlot() {
  d3.json(url).then(function(data){
    var age = unpack(data, 1)
    var sex = unpack(data, 2)
    var target = unpack(data, 14)
    var chest_pain_type = unpack(data, 4)

    console.log(age);
    console.log(sex);
    console.log(target);
    console.log(chest_pain_type);

    var y0 = [];
    var y1 = [];
    var y2 = [];
    var y3 = [];
    var y4 = [];



    var trace1 = {
      y: age,
      boxpoints: "all",
      type: "box"
    };

    // Create a trace object with the data in `y1`
    var trace2 = {
      y: age,
      boxpoints: "all",
      type: "box"
    };

    var trace3 = {
      y: age,
      boxpoints: "all",
      type: "box"
    };

    var trace4 = {
      y: age,
      boxpoints: "all",
      type: "box"
    };

    var trace5 = {
      y: age,
      boxpoints: "all",
      type: "box"
    };

    // Create a data array with the above two traces
    var data = [trace1, trace2, trace3, trace4, trace5];

    // Use `layout` to define a title
    var layout = {
      title: "Age by Heart Condition Type"
    };

    // Render the plot to the `plot1` div
    Plotly.newPlot("plot1", data, layout);


    //Normalized Stacked Filled Line Chart
    var plotDiv = document.getElementById('plot');
    var traces = [
        {x: [1,2,3], y: [2,1,4], stackgroup: 'one', groupnorm:'percent'},
        {x: [1,2,3], y: [1,1,2], stackgroup: 'one'},
        {x: [1,2,3], y: [3,0,2], stackgroup: 'one'}
    ];

    Plotly.newPlot('plot2', traces, {title: 'Heart Condition Type (Normalized)'});

    // Stacked Bar Chart
    var trace1 = {
      x: ['fixed defect', 'normal', 'reversible defect'],
      y: [20, 14, 23],
      name: 'Men',
      type: 'bar'
    };

    var trace2 = {
      x: ['fixed defect', 'normal', 'reversible defect'],
      y: [12, 18, 29],
      name: 'Women',
      type: 'bar'
    };

    var data = [trace1, trace2];

    var layout = {barmode: 'stack'};

    Plotly.newPlot('plot3', data, layout);



  // Heart Condition by Age
    var trace1 = {
      x: age,
      y: target,
      name: 'Hello World',
      type: 'bar'
    };
    var data = [trace1]
    var layout = {
      title: "Heart Disease by Age"
    };
    Plotly.newPlot('plot4', data, layout);

  // Heart Condition by Gender
    var trace1 = {
      x: sex,
      y: target,
      name: 'Hello World',
      type: 'bar'
    };
    var data = [trace1]
    var layout = {
      title: "Heart Disease by Gender"
    };
    Plotly.newPlot('plot5', data, layout);

  // Chest Pain Type By Age
    var trace1 = {
      x: age,
      y: chest_pain_type,
      name: 'Hello World',
      type: 'bar'
    };
    var data = [trace1]
    var layout = {
      title: "Chest Pain Type by Age"
    };
    Plotly.newPlot('plot6', data, layout);

  });
};

buildPlot();




url = 'http://127.0.0.1:5000/listem';



function buildPlot1() {
  d3.json(url).then(function(data){
  var men = Object.values(data.men);
  var women = Object.values(data.women);

  // Create an array of music provider labels
  var labels = Object.keys(data.men);

  // Display the default plot
  function init() {
    var data = [{
      values: men,
      labels: labels,
      type: "pie"
    }];

    var layout = {
      height: 600,
      width: 1000
    };

    Plotly.newPlot("pie", data, layout);
  }

  // On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);
    // Function called by DOM changes
    function getData() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      // Initialize an empty array for the country's data
      var data = [];

      if (dataset == 'dataset1') {
          data = men;
      }
      else if (dataset == 'dataset2') {
          data = women;
      }
      // Call function to update the chart
      updatePlotly(data);
    }

    // Update the restyled plot's values
    function updatePlotly(newdata) {
      Plotly.restyle("pie", "values", [newdata]);
    }
    init();
  })
}

buildPlot1();
