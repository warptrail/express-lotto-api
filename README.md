# Lotto Number Generator

## Explanation:

This is a simple API that accepts an array of six numbers between 1 and 20. The program compares your six numbers to a simulated lottery ball drawing. A random number generator chooses six numbers between 1 and 20 and compares them to your numbers.

## Installing

1. Download or clone this git repository.

2. In the root directory, run the terminal command: `npm install`

## Instructions:

1. To start the server run: `npm start` or to use nodemon run: `npm run dev`

2. To make a call to play in the simulated lotto, use your web browser, Postman, or equivalent tool.

3. The endpoint to make the lotto call is: http://localhost:8000/lotto

4. The query key is "arr"

5. Enter "?arr=\<your number here\&>" six times over and make a GET request to that url

6. Example: http://localhost:8000/lotto?arr=1&arr=2&arr=3&arr=4&arr=5&arr=6

7. Validation checks on the url will prevent queries of incorrect lengths, non-numerical characters, numbers outside of the 1 to 20 range, and duplicate numbers.

## Lotto winnings

- 0 to 3 numbers guessed correctly: You do not win anything. Try again.

- 4 numbers guessed correctly: You win a free ticket to play again.

- 5 numbers guessed correctly: You win $100.

- 6 numbers guessed correctly: You wind $1,000,000,000.

Disclaimer: All winnings and prizes are make believe, you did not actually win or lose any money.

## Example Response Object

<!-- prettier-ignore -->
```
{
"winningNumbers": [14, 17, 19, 15, 2, 10],
"myNumbers": [3, 4, 5, 6, 14, 12],
"matchingNumbers": [14],
"numberOfMatches": 1,
"message": {
	"winningNumbers": "Tonight's winning lotto numbers are: 14-17-19-15-2-10",
	"myNumbers": "You have chosen the numbers: 3-4-5-6-14-12",
	"matchingNumbers": "You have matched the numbers 14",
	"winnings": "You have only matched 1 number. You lose."
	}
}
```

## Final Thoughts

This project was made as a refresher to learning the very basics of Express. The next step is creating a front end and hosting this api on Heroku. Please be on the lookout for changes coming in the near future.

Have a wonderful day and thanks for checking out my API.

Created by **warptrail**
