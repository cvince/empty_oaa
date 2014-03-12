# OurAgendaApp Documentation 

## Files included:


### (Website)

1. homepage.html

2. contact.html

3. login.html

4. signup.html


### (Webapp)

5. dashboard.html – contains four columns of four types of cards – users, agenda items, action items, and meetings. 

6. user_action_modals.html – this file includes all the code needed for the User and Action item modals/nodes/popups. Includes some default content for reference. 

7. agenda_meetings_modals.html – this file includes all the code needed for the Agenda item and meeting modals/nodes/popups. Includes some default content for reference. 

8. create_modal.html – appears when '+' is activated on a dashboard column, opens a new modal/node to create a new agenda item, action item, or meeting card)


### (CSS & SCSS)

9. _reset.scss includes normalize.css for resetting basic html elements to a “normal” baseline across all major browsers. Is imported to styles.scss.

10. _layout.scss includes all code needed for the fluid grid, site/app container and clearfix (for parent elements that have no height and do not clear their floated children). Is imported to styles.scss. See “the fluid grid” below for more details. 

11. _type.scss includes all basic typographic styles, such as the basic type styles applied all throughout the site and app, links, and headers. Is imported to styles.scss.

12. _general.scss includes general styles applied throughout the site and app, such as buttons, inputs, navigation menus, and styling for site elements. Is imported to styles.scss.

13. _app.scss includes all webapp specific styles. Applies to dashboard, and modals/nodes. Is imported to styles.scss.

14. _variables.scss contains all variables used (for hex colors) and mixins for the gradients and box shadows used on buttons. Is not imported to styles.scss as sass variables and mixins do not get compiled. 

15. styles.scss imports above files and compiles to css/styles.css. 


### (Javascript)

16. css3-mediaqueries.js gives media query support to IE8. Is called through a conditional comment that targets IE browsers below IE9 and IE mobile devices. 

17. tabs.js – I attempted to write my own javascript code for tab functionality, but that didn’t work out very well, so I ended up using this tutorial for the tabs and modified the code as needed. Used only on the agenda_meeting_modals.html and user_action_modals.html

18. I experimented with using some jQuery plugins for the modal/node/popups (have them appear when corresponding card is activated on the dashboard), but all I could find were plugins that required the modal code to be embedded in the dashboard code, which I didn't think would be of any help for the final product?


### The Fluid Grid

Note: I used ems instead of pixels, as the fluid grid works best with relative units of measurement. Ems are relative to the base font size, which in this case is usually 16px (the typical browser default), as determined by the base font-size value of 100%. If you want to change pixels to ems, just take the pixel measurement, say a box with a 500px width, divide by the base font size (16px) and you get a box with a 31.25em width. Now an easy way to scale down elements with em measurements on smaller screen sizes is to just scale down the base font size and everything measured in ems will follow suit.

The responsive aspect to this project is fairly simple. For the sake of those who are following along with the blog posts/ebook, I tried to create the simplest grid I know. It might be good to note that this grid probably isn’t robust enough for more complex layouts. 

Everything is wrapped in a container, which provides a maximum width and basic background styling for the site and app. Then everything is wrapped again in a grid that provides padding on the sides. I used this so that some elements, like the hero banner, can live outside of this grid and stretch all the way to the edges of the container. 

The grid is comprised of four columns. When the screen has a width of at least 10em (any phone pretty much with a width of 240px and up), all 4 columns stack on top of each other and each one has a width of 98%. 

When the screen or browser has a width of at least 52em, the columns float next to each and a single column has a width of 22% (height is determined by the content contained within). Columns have a 1.5% margin around them at all times. A single column has the class name col_1. 

If you wanted a component or element to span two columns, or half of the container, you would give it a class of col_2. These “double” columns have a width of 47%. For something that spans 3 columns use the class col_3 (72% of the container) and for the entire width of the container use col_4 (97% of the container). 

For the app dashboard I have set a special case in which the single columns turn into double columns at a minimum width of 40em. They don’t revert back to single columns until a min width of 75em.

When the screen/browser window scales down, I used media queries to adjust elements to make everything fit together nicely as the screen gets smaller. For the most part I used min-width media queries for really general things, like the fluid grid, and max-width queries for small details and really specific elements. 








