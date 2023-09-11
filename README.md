# Getting Started
There are 2 methods of setting up and running the attempted solution.

1. Docker (Recommend)
2. Normal Way of project installation

## Method 1: Docker (Highly Recommended)
This is the recommended method to run the solution since by using Docker. It ensures that we won't run into some weird dependencies conflict/issues.

1. Clone the repository
```
git clone https://github.com/ystcheng/TBJAssessment.git
```
2. Install Docker if it hasn't been installed yet. You can find the download page here:
```
https://docs.docker.com/get-docker/
```
3. Open up a terminal and ``cd`` into the project's main level:
```
cd TBJAssessment
```
 where you can see the following files:
```
backend.Dockerfile
frontend.Dockerfile
docker-compose.yml
```
4. Then in the terminal, type in the following command to build the project:
```
docker compose build 
```
5. To start the project simply type in the command:
```
docker compose up
```

The attempted solution can now be viewed by navigating to [http://localhost:3000](http://localhost:3000)

**<font size="3">
Note that from steps 4 to 5 the command must be executed in the same project folder level as described in step 3. 
</font>**

## Method 2: Normal Way of installation
**<font size="3">
Note that before we continue with the installation, ensure that the following python and node version is installed:
</font>**
```
python >= 3.8
node >= 20.0
```
The solution might still work if the requirements aren't met but no promises there since I've developed the solution specifically on python 3.8 and node 20.0 platform

1. Clone the repository
```
git clone https://github.com/ystcheng/TBJAssessment.git
```
2. Open a terminal and ``cd`` into the project folder:
```
cd TBJAssessment
```
3. Run the following command to install the dependencies used by the python backend:
```
pip install requirements.txt
```
4. Afterwards, ``cd`` into the folder: ``frontend`` and run the command to install the frontend dependencies:
```
npm install --legacy-peer-deps
```
5. To run the project, first navigate to the ``frontend`` folder and type in the command:
```
npm start
```
then navigate to the ``backend`` folder and type in the command:
```
python manage.py runserver
```
Finally, the attempted solution can now be viewed by navigating to [http://localhost:3000](http://localhost:3000)
