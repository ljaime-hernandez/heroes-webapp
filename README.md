# Comic Heroes WebApp

Webapp link: https://heroes-webapp.netlify.app

Webapp designed to practice several uses for React features such as:

* private and public routes 
* routing by parameters or queries
* useNavigate Hook
* useLocation Hook
* localStorage
* context
* reducer
* unit testing (more information on the test section and each test file in the source folder)

more information about the webapp functionality can be found in each file and this readme file which has 
been extensively documented for educational purposes. thanks for taking your time to review my code or 
notes and leave either a comment or a star if you found it useful.

## routers

### AppRouter:

Will contain the main logic on how the user is going to have availability to access both public 
or private routes from our webapp, it has a single public route leading the user to the login 
page if the user is not authenticated, if its authenticated then it wont allow the user to come 
back to public pages but will access all the private ones.

### PublicRoute:

Will use the user data taken from the context, confirming if the user is logged in, if it is then 
it will render the marvel main page, if not it will render its 'children' component, which is the 
login page as seen from the AppRouter file

### PrivateRoute:

The logic behind it is the same as in the PublicRoute router, the difference will be the user state, 
allowing it to access only private routes. Additional to it, as it is a higher-end component, it will 
trigger the useLocation hook which will save any of the private routes used by the user, so, if the 
user logs out, once the user is back, it will return to the page previous to logging out.

### DashboardRoutes:

Contains the NavBar component, along with all the paths on the private routes of the webapp, every path 
renders an specific element which will be the actual components of our webpage, with them we will filter 
and render heroes information by name, by id or by publisher.

## components

### HeroesWebApp:

Will be our initial point on the webapp, the component will return the AppRouter component encapsulated 
in a higher-order context component, the information in the context is from a custom reducer which will 
use the localStorage on the browser to save a state of login/logout, any changes done to the user data 
will be updated with a useEffect hook

### DcScreen:

will render the HeroList component by sending the 'DC Comics' publisher as parameter, when DC is clicked 
on the navigation bar, it should only display heroes from dc comics

### MarvelScreen:

will render the HeroList component by sending the 'Marvel Comics' publisher as parameter, when DC is clicked 
on the navigation bar, it should only display heroes from marvel

### HeroList:

Receives a publisher as parameter, the publisher will then be used on a selector/helper function returning all 
the objects which contain the publisher used on it, the function is used with a useMemo hook so the page does 
not return the same data pieces in case a new query returns some of the same objects, saving memory and data 
usage by the user. each object is then passed as parameter on a HeroCard component for further rendering

### HeroCard:

Render each hero values into HTML elements, also uses a selector/helper to retrieve images from an assets folder 
dynamically

### Hero:

will work similar to the HeroCard, but it renders a single hero by retrieving the parameter used in the heroCard 
link and uses it as an id to retrieve the images from the assets folder, it displays the whole hero information 
and has a return button to lead the user to the heroes page from the same publisher

### SearchScreen:

Uses an input which, once submitted, will use the useNavigate hook create a query, the query then will trigger the 
useLocation hook, along with the queryString method, will retrieve the query parameter and assign it to a useForm 
hook value, used finally as a final parameter on a selector/helper to retrieve all the heroes which their id matches 
the query parameter, the data returned will then be rendered using the HeroCard component

### NavBar:

Uses the context to retrieve the user name to render it on the screen. I also has classes to highlight the active tab 
on the screen, the button will dispatch a log out state into the reducer for the user status to change to logout

## tests:

### reducer:

* tests for default state using toEqual
* tests for logged in/out state by sending objects with both the action and the user state

### routers:

* tests for default components rendered using mount with snapshots
* tests for private routes rendered using mount with snapshots and for some classes to exists by using toBeTruthy
* tests for paths to guide the user towards both private and public routes based in their login/logout state using 
the context and the MemoryRouter component
* tests for localStorage items to be stored or retrieved when private and public routes are called

### components:

* tests for each components default return elements
* tests for both parameters or queries to work appropriately in the Hero components, either with correct or incorrect information
* tests on reducer to dispatch the right parameters when necessary
* tests on navigate hook to receive the right parameters when called

### dependencies:

- enzyme
- enzyme-to-json
- jest
- react
- react-hooks
- react-router-dom
- bootstrap (CDN)