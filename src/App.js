import React from 'react';

function HomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to the Blood Management System</h1>
      </header>
      <main>
        <section>
          <h2>Available Actions</h2>
          <ul>
            <li><a href="/donors">View Donors</a></li>
            <li><a href="/recipients">View Recipients</a></li>
            <li><a href="/requests">View Requests</a></li>
            <li><a href="/info">View Info</a></li>
            {/* Add more links to other sections as needed */}
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Blood Management System</p>
      </footer>
    </div>
  );
}

export default HomePage;
