# What URL should be used to access your application?	
	- https://github.com/ig16022/frontend-test

# What libraries did you use to write your application?
	- AngularJS (including routing and animation)

	- Bootstrap

	- Font-Awesome (iconography)

	- ngStorage (access to the local storage and session storage)

	- ng-grid (grid)

# What influenced the design of your user interface?
	- The functional requirements / nature of the application / locked API

	- Bootstrap

	- Experience / Recent Projects

# What steps did you take to make your application user friendly?
	- Clearly identified and segregated available functionality. 
	  White space & gutters separated sub-sections. 
	  Prominent placement of interactive features and controls. 

	  Consistent nav-bar navigation. Meaningful iconography. 
	  Friendly and easy to understand language describing the available functionality. 
	  Minimum animation and control movement.

	  Responsive design (Bootstrap).

# What steps did you take to insure your application was secure?
	- Restricted access to all features that require user authentication.

	  All API requests require credentials.

# What could be done to the front end or back end to make it more secure?
	- Since cookie based authentication mechanism is used it would be wise to 
	  implement an anti-forgery token mechanism for XSRF protection. The server 
	  should set a token in a JavaScript readable session cookie called 
	  XSRF-TOKEN on the first HTTP GET request.

	- To counter JSON vulnerability the server should be set up to prefix all 
	  JSON requests. This is desirable to prevent third party websites from 
	  turning our JSON resource URLs into JSONP requests. 

	- On the front-end the user session should expire automatically after 
	  a preconfigured period, if the user is inactive. I did not implement 
	  idle timeout functionality to keep this app simple.

	- In general I would move away from the cookie-based authentication 
	  mechanism and implement OAuth 2.0 with refresh tokens on the server.
