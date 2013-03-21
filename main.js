/**
*	Visual Frameworks Project 2
*	By: Deus Duke
*	Term:  1303
**/

// this string is used to display a project as html

/*jshint multistr: true */
var projectItemHtml = " \
<div class='project_list_item'> \n\
	<h3>{0}</h3> \n\
	<p>Start Date: {1}</p> \n\
	<p>Type: {2}</p> \n\
	<p>priority: {3}</p> \n\
	<a href='#' data-id='{4}'>Edit Project</a> \n\
	<br/> \n\
	<a href='#' data-id='{4}'>Delete Project</a> \n\
</div>\n";

// utility function to create formatted string similar to .Net
String.prototype.format = function() {
	str = this;

	for (var i in arguments) {
		str = str.replace('{' + i.toString() + '}', arguments[i]);
		++i;
	}

	return str;
};

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

// hide the message
function hideMessage() {
	// hide message so that user doesn't think that the project
	// was saved when it wasn't
	document.getElementById('message').className = 'hide';
}

/**
 * Validations fields, if and error if found and alert
 * is displdyed
 * @return {bool} true if valid, otherwise false
 */
function validateFields()
{
	hideMessage();

	var itxName = document.getElementById('projectName');
	var idStartDate = document.getElementById('startDate');
	var idType = document.getElementById('type');

	if (isBlank(itxName.value))
	{
		alert('You must enter a project name');
		return false;
	}

	if (isBlank(idStartDate.value))
	{
		alert('You must enter a start date');
		return false;
	}

	if (isBlank(idStartDate.value))
	{
		alert('You must enter a start date');
		return false;
	}

	var rbuttons = document.getElementById('mainForm').type;
	var strType = getValueFromRadioButtons(rbuttons);

	if (isBlank(strType))
	{
		alert('You must select a project type');
		return false;
	}

	// at this point, all information is valid
	return true;
}

/**
 * Create a project and store it to the client */
function createProject()
{
	// validate all fields, if information is missing or
	// incorrect return
	if (!validateFields()) return;

	// build the project objet
	var project = {};

	project.name = document.getElementById('projectName').value;
	project.startDate = document.getElementById('startDate').value;

	var rbuttons = document.getElementById('mainForm').type;
	project.type = getValueFromRadioButtons(rbuttons);

	project.priority = document.getElementById('mainForm').priority.value;

	// store the date
	storeProject(project);

	// show all data
	// showAllProjects();

	// show confirmation message
	window.location = "addItem.html?success=true";
}

// send the project to local storage
function storeProject(project) {
	// give the project an id
	if (project.id == null)
	{
		project.id = new Date().getTime();
	}

	// convert to JSON and store in the database
	data = JSON.stringify(project);

	console.log(data);

	// use timestamp to make unique
	localStorage.setItem(project.id, data);
}

// retrieve all of our projects from local storage
function retrieveProjects() {
	var projects = [];

	// get all the data back out and convert back to projects
	for (var i = 0; i < localStorage.length; i++){
		var json = localStorage.getItem(localStorage.key(i));
		projects[i] = eval('({0})'.format(json));
	}

	return projects;
}

// hide form and show the project list
function showAllProjects(){
	hideMessage();

	// if we are already viewing all projects, return
	if (document.getElementById('project_list').className != 'hide') return;

	projects = retrieveProjects();


	document.getElementById("mainForm").className = "hide";
	document.getElementById("showAll").className = 'hide';
	document.getElementById("project_list").className = '';
	document.getElementById("addNew").className = '';

	// add the project items to the list
	var projectListHtml = "";
	for(var i in projects) {
		var project = projects[i];

		var projectAsHtml = projectItemHtml.format(
										project.name,
										project.startDate,
										project.type,
										project.priority,
										project.id);
		projectListHtml += ('\n' + projectAsHtml);

	}

	// finally we need to insert into the page
	document.getElementById("project_list").innerHTML = projectListHtml;
}

// clear all stored data
function clearAllProjects(){
	localStorage.clear();

	alert("All projects have been removed");

	document.getElementById("project_list").innerHTML = '';
}

// get the value from an array of radiout button
function getValueFromRadioButtons(arrRadioButtons) {
	for(var i in arrRadioButtons) {
		var rb = arrRadioButtons[i];

		if (rb.checked) return rb.value;
	}

	// nothing was checked
	return null;
}

// add new project
function addNew() {
	document.getElementById("mainForm").className = "";
	document.getElementById("showAll").className = '';
	document.getElementById("project_list").className = 'hide';
	document.getElementById("addNew").className = 'hide';
}
