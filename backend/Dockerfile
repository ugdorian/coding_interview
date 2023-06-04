# Use a Python base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the backend code into the container
COPY . /app


# Install dependencies
RUN pip install -r requirements.txt

# Expose the desired port (assuming it's port 5000)
EXPOSE 5000

ENV FLASK_APP=main.py


# Set the command to run the backend server
CMD ["flask", "run", "--host=0.0.0.0"]
