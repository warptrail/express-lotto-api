const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Good Luck!');
});

app.get('/lotto', (req, res) => {
  const { arr } = req.query;

  // Generate the winning lotto numbers
  function generateWinningLottoNumbers() {
    // basic random number generator range
    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }
    // create a sequence of numbers
    function createSequence(start, end) {
      let sequence = [];

      for (let i = start; i <= end; i++) {
        sequence.push(i);
      }

      return sequence;
    }

    // 20 balls in a basket, each with their number
    let lottoBalls = createSequence(1, 20);

    //
    let winningBalls = [];

    // roll 6 balls out of the cage
    for (let i = 0; i < 6; i++) {
      let randomIndex = getRandomNumber(0, lottoBalls.length - 1);
      let randomBall = lottoBalls[randomIndex];
      winningBalls.push(randomBall);
      lottoBalls.splice(randomIndex, 1);
    }

    return winningBalls;
  }

  let winningNumbers = generateWinningLottoNumbers();
  // let winningNumbers = [2, 1, 15, 16, 17, 13]; // hard coded example

  // if no query named array
  if (!arr) {
    return res
      .status(400)
      .send(
        'Please send a query with key named arr of 6 lotto numbers between 1 and 20'
      );
  }

  // if not 6 numbers in array
  if (arr.length != 6) {
    return res.status(400).send('need 6 numbers');
  }

  // make sure they are all numbers
  function checkIfOnlyNumbers(n) {
    return /^[0-9]*$/.test(n);
  }

  if (!arr.every(checkIfOnlyNumbers)) {
    return res.status(400).send('Non-numerical characters detected');
  }

  // convert the strings into actual numbers
  arr.forEach((number, index) => {
    arr[index] = parseInt(number);
  });

  // check to see if each number is within the range of 1 and 20
  function checkBetweenRange(n) {
    return n >= 1 && n <= 20;
  }

  if (!arr.every(checkBetweenRange)) {
    return res.status(400).send('Numbers must be between 1 and 20');
  }

  function toFindDuplicates(arr) {
    let resultToReturn = false;
    // indexOf returns the first index of the specified element
    // if that index does not correspond with the index of some
    // then that means there must be more than one
    resultToReturn = arr.some((element, index) => {
      return arr.indexOf(element) !== index;
    });
    return resultToReturn;
  }

  if (toFindDuplicates(arr)) {
    return res.status(400).send('duplicate values detected');
  }

  // By this point, the inputted lotto numbers are valid
  // Time to compare the two arrays

  function compareArrays(winningNumbers, myNumbers) {
    // if the two arrays are not the same length then abort
    if (winningNumbers.length !== myNumbers.length) {
      return 'Error: the two arrays are not the same length.';
    }

    // initialize empty array to store matches
    let matchingNumbers = [];

    // loop through my numbers
    for (let i = 0; i < myNumbers.length; i++) {
      // for each number in my array, compare that to all the numbers in the winning array
      let number = myNumbers[i];
      // if matched with some, isMatched will be true
      let isMatched = winningNumbers.some((n) => {
        return n === number;
      });
      // if that is true, add that number to the matching array
      if (isMatched) {
        matchingNumbers.push(number);
      }
    }
    // return the whole array of matching numbers
    return matchingNumbers;
  }

  const matchingNumbers = compareArrays(winningNumbers, arr);

  // compose the message object based on the data now.
  function composeMessage() {
    let message = '';
    let winningNumbersString = `Tonight's winning lotto numbers are: ${winningNumbers.join(
      '-'
    )}`;
    let myNumbersString = `You have chosen the numbers: ${arr.join('-')}`;
    let matchingNumbersString = matchingNumbers.length
      ? `You have matched the numbers ${matchingNumbers.join('-')}`
      : 'You have not matched any numbers';

    if (matchingNumbers.length == 0) {
      message = `You have not matched any numbers. You lose.`;
    } else if (matchingNumbers.length == 1) {
      message = `You have only matched ${matchingNumbers.length} number. You lose.`;
    } else if (matchingNumbers.length >= 2 && matchingNumbers.length < 4) {
      message = `You have only matched ${matchingNumbers.length} numbers. You lose.`;
    } else if (matchingNumbers.length == 4) {
      message = `Congratulations! You have matched 4 numbers! You win a free ticket for another chance to lose!`;
    } else if (matchingNumbers.length == 5) {
      message = `Congratulations! You have guessed 5 out of 6 numbers! You win $100.`;
    } else if (matchingNumbers.length == 6) {
      message = `Holy Lotto Balls Batman! You have guessed all 6 numbers! You win $1,000,000,000!`;
    }

    let messageObject = {
      winningNumbers: winningNumbersString,
      myNumbers: myNumbersString,
      matchingNumbers: matchingNumbersString,
      winnings: message,
    };

    return messageObject;
  }

  // compiling the final response object
  const responseObject = {
    winningNumbers: winningNumbers,
    myNumbers: arr,
    matchingNumbers: matchingNumbers,
    numberOfMatches: matchingNumbers.length,
    message: composeMessage(matchingNumbers),
  };

  res.json(responseObject);
});

app.listen(8000, () => {
  console.log('Express server listening on port 8000!');
});
