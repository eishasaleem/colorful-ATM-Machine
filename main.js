#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 10000;
let myPin = 1234;
// Print welcome message
console.log(chalk.blue("\n \tWelcome to Eisha Saleem - ATM Machine\n"));
// prompt the user to enter their PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your pin code:")
    }
]);
// check if the entered PIN is correct
if (pinAnswer.pin === myPin) {
    console.log(chalk.bold.greenBright("\nPin is Correct ! Login Successfully!\n"));
    // prompt the user to select (withdraw or check balance)
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.hex('#99CCFF')("Select your operation: "),
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ]);
    // if the user selects "withdraw"
    if (operationAns.operation === "Withdraw Amount") {
        // prompt the user to select ("Fast Cash" or "Enter Amount")
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawal method",
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "list",
                    message: "Select Amount:",
                    choices: [1000, 2000, 5000, 10000, 20000, 50000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdraw successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw:"
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(` ${amountAns.amount} Withdraw Successfully`);
                console.log(`Your Remaining Balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${myBalance}`);
    }
}
else {
    console.log(chalk.red("Pin is Incorrect, Try Again"));
}
