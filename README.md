# TheSpoon
<p align="left">
  <img width="50%" src="https://www.architetti.com/wp-content/uploads/2017/03/polimi-1.jpg" alt="header" />
  <img src="https://i.imgur.com/mPb3Qbd.gif" width="180" alt="Politecnico di Milano" align="right"/>
</p>
<p align="right">
  <img width="10%" src="https://upload.wikimedia.org/wikipedia/en/2/27/Fakultet_elektrotehnike_i_ra%C4%8Dunarstva%2C_Sveu%C4%8Dili%C5%A1te_u_Zagrebu_%28logo%29.jpg" alt="header" align ="left"/>
  <img width="50%" src="http://2018.mia-journal.com/wp-content/uploads/2017/11/fer1.jpg" alt="header" />
</p>

## Description
Repository of the project developed for the "Distributed Software Development" course, part of the Master of Science in Computer Science and Engineering and shared by Politecnico di Milano (POLIMI), Mälardalen University and Fakultet elektrotehnike i računarstva (Faculty of electrical engineering and computing) (FER). The group is formed by 10 students: 6 from Politecnico di Milano and 4 from Fakultet elektrotehnike i računarstva.

This course aims at assessing the students' ability to design and implement a complex software system by working togheter from different places in the world (some students are from POLIMI, which is in Milan (Italy), some others are from FER, which is in Zagreb (Croatia)). The requirements were given by a customer, which was a Senior developer in Deloitte Digital, so another assessed ability was being able to constantly contact him and satisfy his requests. The working framework used is SCRUM, so the students' ability to organize meetings and respect the SCRUM rules was also assesed. 

This repository refers to the 2019-2020 edition of the course, and the project assigned is "TheSpoon": an application that lets restaurant owners to register with their restaurant data and its menus, while customers can search specific food they want to eat and rate the restaurants. Another type of user, the consultant, can access the statistics of the application and monetize them by helping the restaurant owners improving their activity. More precisily, the project included:
- A web application used by the restaurant owners and the consultants
- A mobile app used by the customers
- a backend that offers REST API endpoints to both the web application and the mobile app, with a Postgres database

The 10 members of the team were then divided among 3 subteams: web application subteam (4 people), mobile app subteam (3 people), backend subteam (3 people).

## Run the application
The server is hosted on Heroku. The folder of the web application is "thespoon". This is the link to access the running web app:

http://thespoon.herokuapp.com/

The backend is managed at the route of the repo. Here you can find the Swagger documentation of all the endpoints offered (it is also possibile to directly use them through the GUI, sending real messages to the backend and getting back real responses):

https://thespoon.herokuapp.com/api/docs/

The folder of the mobile app is "mobileApp". Inside that there is another README which explains how to run it.

The project has been developed with the following technologies:
- Server hosting: Heroku
- Backend: NodeJS
- Testing the backend: Jest
- API reference: Swagger
- Database: Postgres
- Frontend web: React
- Testing the web app: Jest
- Frontend mobile: React Native with Expo
- Testing the mobile app: Jest, Enzyme
- Continuous integration: Travis CI
- Textual communication: Slack
- Meetings: Zoom

## Group
| First name | Last Name | University | Subteam         |
| ---------- | --------- | ---------- | --------------- |
| Ida Merete | Enholm    | POLIMI     | Mobile app      |
| Janine     | Stang     | POLIMI     | Mobile app      |
| Cathrine   | Akre-Aas  | POLIMI     | Mobile app      |
| Emilio     | Imperiali | POLIMI     | Backend         |
| Frikk      | Andersen  | POLIMI     | Backend         |
| Marin      | Milina    | FER        | Backend         |
| Markus     | Paulsen   | FER        | Web app         |
| Lora       | Žuliček   | FER        | Web app         |
| André      | Aing      | POLIMI     | Web app         |
| Matej      | Lazić     | FER        | Web app         |
