# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Add `customID` field to `Agents` table in DB

<!-- Inferring that 30 characters should be enough to hold the custom id -->

In the database, we want to create a new field called `customID` in the `Agents` table. It should be a CHAR(30) field.
This field is to be used for generating shifts reports.

## Change `/agents` API to include `customID` field 

<!-- 
  • inferring usage of REST API
  • inferring that POST and PATCH methods return the whole Agent data
-->

In the REST API, we want to make changes so that that it will include the `customID` field on all methods:

- [ ] Include `customID` field on `GET /agents`
- [ ] Accept and return `customID` field on `POST /agents`
- [ ] Accept and return `customID` field on `PATCH /agents`

## Add `Custom ID` field to create/edit Agent form

In the web-app, we want to include the `Custom ID` field to the create/edit Agent forms. This new field's value should be sent to REST API as `customID` upon submission.

We should also prefill the `Custom ID` on edit fields when they already exist for a given Agent.

## Display `Custom ID` value on Agent pages

<!-- 
  • inferring that there is a details page for Agents
  • inferring that there is a details page for Facility, that includes a list that display all its Agents
-->

In the web-app, we want to display the value of the agent's `customID` field on:

- [ ] the Agent's details page.
- [ ] the Facility's details page, within the agents table.

## Change `generateReport` to replace DB ID with `customID` for Agents

When generating the reports, we want to, instead of displaying the internal DB ID for each agent, display the `customID`. 

For the Agents in the report that have no Custom ID set, display, as a fallback, the internal DB ID.