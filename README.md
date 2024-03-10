# Node Express Social Media API README

This README provides instructions on how to run the Node Express app, including details about the `.env` file, the expected format of the `.env.config` file (containing the MongoDB URI), and additional documentation on the API using `apidoc.pdf`. Additionally, an image of the schema can be found in the repository as `schema.png`.

## Getting Started

Follow these steps to set up and run the Node Express app locally.

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB installed and running.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

### Configuration

1. Create a `.env` file in the root directory:

```bash
touch .env
```

2. Open the `.env` file and add the following configuration, replacing `<your-mongo-uri>` with your MongoDB URI:

```env 
PORT=3000
MONGO_URI=<your-mongo-uri>
```

### Running the App

Start the application using the following command:

```bash
npm start
```

The app will be accessible at `http://localhost:3000`.

### API Documentation

The API documentation is available in `apidoc.pdf`. Open this file to explore the details of the API, including endpoints, request/response formats, and any additional information.

### Schema Image

The image depicting the schema of the application can be found in the repository as `schema.png`. This image provides an overview of the database structure and relationships used in the app.

## Additional Information

- Make sure to keep your `.env` file secure and never share sensitive information.
- If you encounter any issues or have questions, refer to the documentation or open an issue in the repository.

Now you should have the Node Express app up and running with the necessary configuration. Happy coding!