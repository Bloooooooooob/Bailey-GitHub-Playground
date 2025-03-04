---
layout: post
title: Deployment Blog
comments: true
toc: true
permalink: /deployment-blog/
---

<h2> Test Server </h2>

<img src="/Bailey-GitHub-Playground//images/Deployment.png" height="400"> 

<h2> Port (Backend) </h2>

* Select a port for the server
* Prepare Docker files for the deployment


<h2> Port (Frontend) </h2>

* Give frontend access to domain and ports

<h2> AWS </h2>


* Login to AWS
* Select specific class
* Go to csp.nighthawkcodingsociety.com to log in
* Username: ubuntu
* Password: Ubuntu14*&*41

<h2> Application Setup </h2>

* Run docker ps and find port not in use starting with 8
* Test docker-compose up in VSCode terminal
* Type http://localhost:PORT

<h2> Server Setup </h2>

* Clone backend
* Go to backend directory
* Build and test site

<h2> Route 53 DNS </h2>

* Setup DNS subdomain

<h2> Nginx Setup </h2>

* Navigate in terminal to Nginx
* Create config file
* Update config file
* Save changes
* Validate by running
* Test domain on browser

<h2> Certbot Config </h2>

* Run sudo certbot --nginx

<h2> Changing Code </h2>

* Git pull before changing
* Run main
* Locally commit changes
* Start Docker Desktop app
* Sync change or git push

<p> In AWS </p>

* Navigate to repo
* docker-compose down
* Git pull
* Rebuild docker
