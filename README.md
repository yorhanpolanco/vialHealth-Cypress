## Running the Application using Docker Compose

To run the application using Docker Compose, follow these steps:

1. **Install Docker and Docker Compose**: Ensure you have Docker and Docker Compose installed on your machine. You can download and install them from the official Docker website.

3. **Create a `.env` File**: Create a `.env` file in the root directory of the project and add any necessary environment variables. For example:

   ```env
   DATABASE_URL=your_database_url
   API_KEY=your_api_key
   ```

4. **Build and Run the Containers**: Use Docker Compose to build and run the containers.

   ```sh
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers as defined in the `docker-compose.yml` file.

5. **Build and Run the Containers with tests**: Use Docker Compose to build and run the containers.

   ```sh
   docker-compose --profile test up --build
   ```

   This command will build the Docker images and start the containers as defined in the `docker-compose.yml` file  and will run the tests that are already automated in Cypress 

6. **Access the Application**: Once the containers are up and running, you can access the application in your web browser at `http://localhost:3000` (or the port specified in your `docker-compose.yml` file).

7. **Stopping the Containers**: To stop the running containers, use the following command:

   ```sh
   docker-compose down
   ```

   This will stop and remove the containers, networks, and volumes created by Docker Compose.

8. **Additional Commands**: You can also use other Docker Compose commands as needed, such as:

   - `docker-compose logs` to view the logs of the running containers.
   - `docker-compose exec <service_name> <command>` to execute a command in a running container.

For more information on Docker Compose, refer to the [official documentation](https://docs.docker.com/compose/).

8. **Install cypress dependencies**
From the test folder run:
```sh
run npm install
```
9. **Run Cypress headless**
```sh
npx cypress run
```
10. **Run Cypress from GUI**
```sh
npx cypress open
```


