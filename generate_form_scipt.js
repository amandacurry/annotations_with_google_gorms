
function create_ranges_for_data(form, data, data_section_name){
  
   // loop throughh each row
   data.forEach(function (row) {
     
       // create a new question page
      form.addPageBreakItem()

       // add page title
      form.addSectionHeaderItem()
      .setHelpText('Bot: '+ row['eliza']+'\nUser: '+row[data_section_name]);
   
       // create number range input with the title being the document to be labeled
      var item = form.addMultipleChoiceItem();
          item.setTitle('Is the user\'s utterance offensive?')
              .setChoices([
                   item.createChoice('Offensive'),
                   item.createChoice('Non-offensive'),
                   item.createChoice('Non-sensical')
               ]).isRequired();
          
       var swearing = form.addCheckboxItem();
            swearing.setTitle('Does the utterance contain swearwords? ');
            swearing.setChoices([
                 swearing.createChoice('Utterance contains swearwords')
            ]);
     
        var abuse_type = form.addMultipleChoiceItem();
            abuse_type.setTitle('If the utterance is offensive, what kind of abuse is it?')
            .setChoiceValues(['General', 'Sexist', 'Homophobic', 'Racist', 'Ableist'])
            .showOtherOption(true);
     
       var target = form.addMultipleChoiceItem();
            target.setTitle('If the utterance is offensive, is it directed towards an individual or aimed at a general group?')
            .setChoiceValues(['General', 'Aimed at bot', 'Aimed at 3rd party'])
            .showOtherOption(false);
     
     var directness = form.addMultipleChoiceItem();
            directness.setTitle('If the utterance is offensive, is it stated clearly without room for doubt (explicit) or implicit (eg. sarcasm)?')
            .setChoiceValues(['Explicit', 'Implicit'])
            .showOtherOption(false);
     
     
     
     }); // closing for loop
  
}


function getSpreadsheetData(sheetName){
  var arrayOfArrays = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName || 'Sheet1').getDataRange().getValues();
  var headers = arrayOfArrays.shift();
  return arrayOfArrays.map(function (row) {
    return row.reduce(function (memo, value, index) {
      if (value) {
        memo[headers[index]] = value;
      }
      return memo;
    }, {});
  });
  
}

function gen_form(){
  
    var form = FormApp.create('Annotation Data Labelling')
    
    Logger.log('Published URL: ' + form.getPublishedUrl());
  
  desc = "We define abuse as an utterance expressed in order to cause someone to feel resentful, upset, or annoyed, or an utterance that is actively aggressive, attacking.";
  
  form.setDescription(desc);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false)
  
  var data = getSpreadsheetData('eliza_sample');
  
  create_ranges_for_data(form, data, 'user');
  
}
