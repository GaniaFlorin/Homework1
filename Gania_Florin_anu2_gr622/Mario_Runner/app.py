from flask import Flask, render_template, request, redirect, url_for, flash, session, get_flashed_messages
import os
import binascii

app = Flask(__name__)

# Generate a random secret key
app.secret_key = binascii.hexlify(os.urandom(24)).decode()

# Function to write user information to users.txt
def write_to_file(username, password):
    if username and password:  # Check if username and password are not empty
        with open('users.txt', 'a') as file:
            file.write(f"{username}:{password}\n")
    else:
        flash('Username and password cannot be empty', 'error')  # Flash error message


# Route for the home page
@app.route('/')
def home():
    return render_template('index.html', logged_in=False)

# Route for the sign-up page
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        confirm_password = request.form['confirmPassword']

        # Check if any field is empty
        if not username or not password or not confirm_password:
            flash('All fields are required', 'error')  # Flash error message
        elif password == confirm_password:
            # Write user information to users.txt
            write_to_file(username, password)
            flash('Registration successful!', 'success')  # Flash success message
            return redirect(url_for('signin'))
        else:
            flash('Passwords do not match', 'error')  # Flash error message

    # Retrieve flashed messages for the 'error' category
    error_messages = get_flashed_messages(category_filter=['error'])

    # Check if 'error' messages exist in the flashed messages
    if error_messages:
        return render_template('signup.html', error=error_messages[0])

    # Flash success message for successful registration
    flash('Registration successful!', 'success')

    return render_template('signup.html')  # Render the template without error message

# Route for the sign-in page
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Check if user exists in users.txt (you might want to implement a more secure authentication method)
        with open('users.txt', 'r') as file:
            lines = file.readlines()
            for line in lines:
                stored_username, stored_password = line.strip().split(':')
                if username == stored_username and password == stored_password:
                    flash('Login successful!', 'success')  # Flash success message
                    return render_template('index.html', logged_in=True)

        flash('Invalid username or password', 'error')  # Flash error message
        session['error'] = 'Invalid username or password'

    # Check if 'error' key exists in the session before popping it
    error_message = session.pop('error', None)

    # Flash success message for successful login
    flash('Login successful!', 'success')

    return render_template('signin.html', error=error_message)

# Route for logout
@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    flash('Logout successful!', 'success')  # Flash success message
    return redirect(url_for('home'))

# Route for the game page
@app.route('/game')
def game():
    return render_template('game.html')

if __name__ == '__main__':
    app.run(debug=True)
