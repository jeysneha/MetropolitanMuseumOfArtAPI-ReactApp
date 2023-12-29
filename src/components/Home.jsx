import React from 'react';
import { Link} from 'react-router-dom';


function Home(props) {
  return (
    <div>
    <header className='App-header'>
        
        <h1 className='App-title'>Welcome to The Metropolitan Museum of Art Collection API:</h1> </header>
        <p>The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online.</p>

<p>Since it was founded in 1870, The Met has always aspired to be more than a treasury of rare and beautiful objects. Every day, art comes alive in the Museum’s galleries and through its exhibitions and events, revealing both new ideas and unexpected connections across time and across cultures.</p>

<p>The Metropolitan Museum of Art provides select datasets of information on more than 470,000 artworks in its Collection for unrestricted commercial and noncommercial use. To the extent possible under law, The Metropolitan Museum of Art has waived all copyright and related or neighboring rights to this dataset using the Creative Commons Zero license. This work is published from the United States of America. These select datasets are now available for use in any media without permission or fee; they also include identifying data for artworks under copyright. The datasets support the search, use, and interaction with the Museum’s collection.</p>

<p>The Met’s Open Access datasets are available through our API. The API (RESTful web service in JSON format) gives access to all of The Met’s Open Access data and to corresponding high resolution images (JPEG format) that are in the public domain.</p>
<h3>Click the "Objects" Below to navigate to the Collection(the list of art returned by the API) Listing (/collection/page/1) </h3>

        <Link className='objectlink' to='/collection/page/1'>
          Objects
        </Link>
   
      <br />
      <br />  
    </div>
  );
}

export default Home;
