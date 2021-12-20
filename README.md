
You need to build Single Page Application with React.
The following Figma low-fidelity prototype should be used as a basis: 

[Figma](https://www.figma.com/file/h1veXmuEt84sT7PEZgF42K/Frontend_test)
===========


Use any open API to get article names and descriptions. For example:
https://spaceflightnewsapi.net/
Home page should contain:
1. Cards with article titles and descriptions for 100 characters. The user can click on the card to go to an article page that contains the title and full description of the selected article.
2. A field to filter by keyword. The user enters keywords into the field and the system displays all articles containing at least one of the keywords in the name or/and description.
The priority of fields: (1) names; and (2) description. The article with one match in the name is higher than the article with one match in the description.
The matched keywords should be highlighted with yellow color.
What do we expect?

:white_check_mark: Please use TypeScript as the main language
:white_check_mark: CSS preprocessors should be used
:white_check_mark: Please use Material UI
:white_check_mark: Showing an example of a custom hook will be a plus
:black_square_button: Showing an example of state management will be a big plus

____
Working app
https://eloquent-einstein-ed4544.netlify.app/