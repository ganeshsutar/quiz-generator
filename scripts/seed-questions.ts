/**
 * Seed script for populating the database with question sets
 * Run with: npx tsx scripts/seed-questions.ts
 *
 * Prerequisites:
 * 1. Deploy the Amplify backend first: npx ampx sandbox
 * 2. Ensure amplify_outputs.json exists in the project root
 */

import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

// Load Amplify configuration
import outputs from "../amplify_outputs.json";
Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "apiKey",
});

interface QuestionData {
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuestionSetData {
  name: string;
  description: string;
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  questions: QuestionData[];
}

const questionSets: QuestionSetData[] = [
  {
    name: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including types, operators, and core concepts.",
    category: "Programming",
    difficulty: "EASY",
    questions: [
      {
        text: "What is the result of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "number"],
        correctIndex: 2,
        explanation: "This is a well-known bug in JavaScript. typeof null returns 'object' due to how JavaScript was originally implemented.",
      },
      {
        text: "Which method is used to add an element to the end of an array?",
        options: ["unshift()", "push()", "pop()", "shift()"],
        correctIndex: 1,
        explanation: "push() adds elements to the end of an array and returns the new length.",
      },
      {
        text: "What will console.log(1 + '2' + 3) output?",
        options: ["6", "123", "15", "NaN"],
        correctIndex: 1,
        explanation: "JavaScript concatenates when a string is involved. 1 + '2' becomes '12', then '12' + 3 becomes '123'.",
      },
      {
        text: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        correctIndex: 2,
        explanation: "const is used to declare constants that cannot be reassigned after initialization.",
      },
      {
        text: "What does === operator check?",
        options: ["Value only", "Type only", "Value and type", "Reference only"],
        correctIndex: 2,
        explanation: "The strict equality operator (===) checks both value and type without type coercion.",
      },
      {
        text: "What is the output of typeof NaN?",
        options: ["NaN", "undefined", "number", "object"],
        correctIndex: 2,
        explanation: "NaN (Not a Number) is paradoxically of type 'number' in JavaScript.",
      },
      {
        text: "Which array method creates a new array with elements that pass a test?",
        options: ["map()", "filter()", "reduce()", "forEach()"],
        correctIndex: 1,
        explanation: "filter() creates a new array with all elements that pass the test implemented by the provided function.",
      },
      {
        text: "What is the result of [] == false?",
        options: ["true", "false", "undefined", "TypeError"],
        correctIndex: 0,
        explanation: "An empty array is coerced to an empty string '', which is then coerced to 0, and false is also 0, so they're equal.",
      },
      {
        text: "Which method converts a JSON string to a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.toObject()", "JSON.convert()"],
        correctIndex: 1,
        explanation: "JSON.parse() parses a JSON string and returns the corresponding JavaScript value or object.",
      },
      {
        text: "What is a closure in JavaScript?",
        options: [
          "A way to close a browser window",
          "A function with access to its outer scope",
          "A method to end a loop",
          "A type of error handling"
        ],
        correctIndex: 1,
        explanation: "A closure is a function that has access to variables from its outer (enclosing) lexical scope.",
      },
      {
        text: "What does the spread operator (...) do?",
        options: [
          "Multiplies numbers",
          "Expands an iterable into individual elements",
          "Creates a new function",
          "Defines a rest parameter"
        ],
        correctIndex: 1,
        explanation: "The spread operator expands an iterable (like an array) into individual elements.",
      },
      {
        text: "Which statement correctly creates an arrow function?",
        options: [
          "function => () {}",
          "() -> {}",
          "() => {}",
          "=> () {}"
        ],
        correctIndex: 2,
        explanation: "Arrow functions use the syntax () => {} for a function with no parameters.",
      },
      {
        text: "What is the purpose of the 'this' keyword?",
        options: [
          "To reference the current module",
          "To reference the object executing the current function",
          "To create a new variable",
          "To import external libraries"
        ],
        correctIndex: 1,
        explanation: "'this' refers to the object that is executing the current function.",
      },
      {
        text: "What is hoisting in JavaScript?",
        options: [
          "Moving elements up in the DOM",
          "Moving declarations to the top of their scope",
          "Raising errors to the console",
          "Optimizing code performance"
        ],
        correctIndex: 1,
        explanation: "Hoisting is JavaScript's behavior of moving declarations to the top of their containing scope.",
      },
      {
        text: "Which method removes the last element from an array?",
        options: ["pop()", "push()", "shift()", "slice()"],
        correctIndex: 0,
        explanation: "pop() removes the last element from an array and returns that element.",
      },
      {
        text: "What is the difference between let and var?",
        options: [
          "No difference",
          "let is block-scoped, var is function-scoped",
          "var is block-scoped, let is function-scoped",
          "let cannot be reassigned"
        ],
        correctIndex: 1,
        explanation: "let is block-scoped (limited to the block it's declared in), while var is function-scoped.",
      },
      {
        text: "What does async/await do in JavaScript?",
        options: [
          "Makes code run faster",
          "Handles synchronous operations",
          "Simplifies working with Promises",
          "Creates new threads"
        ],
        correctIndex: 2,
        explanation: "async/await is syntactic sugar that makes working with Promises more readable and easier to write.",
      },
      {
        text: "What is the purpose of Array.prototype.map()?",
        options: [
          "To filter elements",
          "To transform each element and return a new array",
          "To find a specific element",
          "To sort the array"
        ],
        correctIndex: 1,
        explanation: "map() creates a new array by applying a function to each element of the original array.",
      },
      {
        text: "What will typeof undefined return?",
        options: ["null", "undefined", "object", "string"],
        correctIndex: 1,
        explanation: "typeof undefined returns the string 'undefined'.",
      },
      {
        text: "Which operator is used for nullish coalescing?",
        options: ["||", "&&", "??", "!!"],
        correctIndex: 2,
        explanation: "The nullish coalescing operator (??) returns the right operand when the left is null or undefined.",
      },
    ],
  },
  {
    name: "React Concepts",
    description: "Test your understanding of React fundamentals, hooks, and component patterns.",
    category: "Frontend",
    difficulty: "MEDIUM",
    questions: [
      {
        text: "What hook is used to manage local state in a functional component?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        correctIndex: 1,
        explanation: "useState is the primary hook for managing local state in functional components.",
      },
      {
        text: "What is the purpose of useEffect?",
        options: [
          "To manage state",
          "To perform side effects",
          "To create context",
          "To optimize rendering"
        ],
        correctIndex: 1,
        explanation: "useEffect is used for side effects like data fetching, subscriptions, or DOM manipulations.",
      },
      {
        text: "What is JSX?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A testing tool"
        ],
        correctIndex: 1,
        explanation: "JSX is a syntax extension that allows you to write HTML-like code in JavaScript.",
      },
      {
        text: "What is the virtual DOM?",
        options: [
          "A real DOM copy",
          "A lightweight copy of the actual DOM",
          "A browser feature",
          "A CSS property"
        ],
        correctIndex: 1,
        explanation: "The virtual DOM is a lightweight JavaScript representation of the actual DOM used for efficient updates.",
      },
      {
        text: "What is the correct way to pass a prop to a component?",
        options: [
          "<Component prop={value}>",
          "<Component.prop = value>",
          "<Component value>",
          "<Component(prop=value)>"
        ],
        correctIndex: 0,
        explanation: "Props are passed using the syntax <Component propName={value} />.",
      },
      {
        text: "What hook would you use for context in functional components?",
        options: ["useState", "useEffect", "useContext", "useMemo"],
        correctIndex: 2,
        explanation: "useContext allows functional components to consume values from a Context provider.",
      },
      {
        text: "What is React.memo used for?",
        options: [
          "Creating memos in the app",
          "Memoizing components to prevent unnecessary re-renders",
          "Storing data in memory",
          "Creating notes"
        ],
        correctIndex: 1,
        explanation: "React.memo is a higher-order component that memoizes the result to prevent unnecessary re-renders.",
      },
      {
        text: "What is the purpose of keys in React lists?",
        options: [
          "For styling",
          "To help React identify which items changed",
          "For accessibility",
          "For SEO"
        ],
        correctIndex: 1,
        explanation: "Keys help React identify which items have changed, been added, or removed for efficient reconciliation.",
      },
      {
        text: "What is the difference between controlled and uncontrolled components?",
        options: [
          "Controlled have access to state",
          "Controlled components have their state managed by React",
          "Uncontrolled use Redux",
          "There is no difference"
        ],
        correctIndex: 1,
        explanation: "Controlled components have their form data controlled by React state, while uncontrolled use refs.",
      },
      {
        text: "What hook is used for performance optimization through memoization?",
        options: ["useState", "useEffect", "useMemo", "useRef"],
        correctIndex: 2,
        explanation: "useMemo memoizes expensive calculations to prevent unnecessary recalculations on re-renders.",
      },
      {
        text: "What is a React Fragment?",
        options: [
          "A piece of broken code",
          "A way to group elements without adding extra DOM nodes",
          "A type of component",
          "A testing utility"
        ],
        correctIndex: 1,
        explanation: "Fragments let you group children elements without adding extra nodes to the DOM.",
      },
      {
        text: "What is the purpose of useCallback?",
        options: [
          "To call functions",
          "To memoize callback functions",
          "To handle errors",
          "To create callbacks"
        ],
        correctIndex: 1,
        explanation: "useCallback returns a memoized callback to prevent unnecessary re-creations of functions.",
      },
      {
        text: "What is prop drilling?",
        options: [
          "A testing technique",
          "Passing props through many component levels",
          "A build optimization",
          "An error handling pattern"
        ],
        correctIndex: 1,
        explanation: "Prop drilling refers to passing props through many component levels to reach a deeply nested component.",
      },
      {
        text: "What is the correct lifecycle order in class components?",
        options: [
          "render, mount, update",
          "mount, render, unmount",
          "constructor, render, componentDidMount",
          "render, constructor, mount"
        ],
        correctIndex: 2,
        explanation: "The order is: constructor → render → componentDidMount for the mounting phase.",
      },
      {
        text: "What does useRef return?",
        options: [
          "A state variable",
          "A mutable ref object with a .current property",
          "A callback function",
          "An effect"
        ],
        correctIndex: 1,
        explanation: "useRef returns a mutable ref object whose .current property is initialized to the passed argument.",
      },
      {
        text: "What is the purpose of React.lazy?",
        options: [
          "To slow down rendering",
          "For code-splitting and lazy loading components",
          "To create lazy components",
          "For error handling"
        ],
        correctIndex: 1,
        explanation: "React.lazy enables code-splitting by allowing you to load components dynamically.",
      },
      {
        text: "What is a Higher-Order Component (HOC)?",
        options: [
          "A component at the top of the tree",
          "A function that takes a component and returns a new component",
          "A class component",
          "A built-in React component"
        ],
        correctIndex: 1,
        explanation: "An HOC is a function that takes a component and returns an enhanced version of that component.",
      },
      {
        text: "What is the StrictMode component used for?",
        options: [
          "To enforce TypeScript",
          "To highlight potential problems in the app",
          "To improve performance",
          "To enable dark mode"
        ],
        correctIndex: 1,
        explanation: "StrictMode is a tool for highlighting potential problems like deprecated APIs and side effects.",
      },
      {
        text: "What is the purpose of the dependency array in useEffect?",
        options: [
          "To list npm dependencies",
          "To specify when the effect should re-run",
          "To import modules",
          "To define state variables"
        ],
        correctIndex: 1,
        explanation: "The dependency array tells React when to re-run the effect based on value changes.",
      },
      {
        text: "What is reconciliation in React?",
        options: [
          "Error recovery",
          "The process of updating the DOM efficiently",
          "State management",
          "Component mounting"
        ],
        correctIndex: 1,
        explanation: "Reconciliation is React's algorithm for diffing the virtual DOM to update the actual DOM efficiently.",
      },
    ],
  },
  {
    name: "TypeScript Basics",
    description: "Test your knowledge of TypeScript type system, interfaces, and common patterns.",
    category: "Programming",
    difficulty: "EASY",
    questions: [
      {
        text: "What is TypeScript?",
        options: [
          "A JavaScript framework",
          "A typed superset of JavaScript",
          "A CSS preprocessor",
          "A testing library"
        ],
        correctIndex: 1,
        explanation: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
      },
      {
        text: "How do you define an interface in TypeScript?",
        options: [
          "class Interface {}",
          "interface Name {}",
          "type Interface = {}",
          "def interface {}"
        ],
        correctIndex: 1,
        explanation: "Interfaces in TypeScript are defined using the 'interface' keyword followed by a name and body.",
      },
      {
        text: "What is the 'any' type used for?",
        options: [
          "For numbers only",
          "To opt-out of type checking",
          "For arrays only",
          "For functions only"
        ],
        correctIndex: 1,
        explanation: "The 'any' type allows you to opt-out of type checking for a variable.",
      },
      {
        text: "What is a union type?",
        options: [
          "A type that combines objects",
          "A type that can be one of several types",
          "A type for arrays",
          "A type for functions"
        ],
        correctIndex: 1,
        explanation: "A union type allows a value to be one of several types, using the | operator (e.g., string | number).",
      },
      {
        text: "How do you make a property optional in an interface?",
        options: [
          "property: optional string",
          "property?: string",
          "optional property: string",
          "property: string?"
        ],
        correctIndex: 1,
        explanation: "Optional properties are marked with a ? after the property name.",
      },
      {
        text: "What is a generic type?",
        options: [
          "A basic type",
          "A type that works with multiple types",
          "A string type",
          "An error type"
        ],
        correctIndex: 1,
        explanation: "Generics allow you to create reusable components that work with multiple types.",
      },
      {
        text: "What is the 'never' type?",
        options: [
          "A type for null values",
          "A type for functions that never return",
          "A type for empty arrays",
          "A type for undefined"
        ],
        correctIndex: 1,
        explanation: "The 'never' type represents values that never occur, like functions that always throw.",
      },
      {
        text: "What is type inference?",
        options: [
          "Explicit type declaration",
          "TypeScript automatically determining types",
          "Type conversion",
          "Type checking"
        ],
        correctIndex: 1,
        explanation: "Type inference is when TypeScript automatically determines the type based on the value.",
      },
      {
        text: "What is a tuple in TypeScript?",
        options: [
          "A type of function",
          "An array with fixed types for each element",
          "A type of object",
          "A type of class"
        ],
        correctIndex: 1,
        explanation: "A tuple is an array where the type of a fixed number of elements is known.",
      },
      {
        text: "How do you define a type alias?",
        options: [
          "alias Type = string",
          "type Type = string",
          "typedef Type string",
          "Type = string"
        ],
        correctIndex: 1,
        explanation: "Type aliases are created using the 'type' keyword.",
      },
      {
        text: "What is the difference between interface and type?",
        options: [
          "No difference",
          "Interfaces can be extended, types can use unions",
          "Types are faster",
          "Interfaces are deprecated"
        ],
        correctIndex: 1,
        explanation: "Interfaces can be extended and merged, while types support unions and intersections more easily.",
      },
      {
        text: "What is an enum in TypeScript?",
        options: [
          "A type of function",
          "A way to define named constants",
          "A type of array",
          "A type of object"
        ],
        correctIndex: 1,
        explanation: "Enums allow you to define a set of named constants.",
      },
      {
        text: "What does 'readonly' modifier do?",
        options: [
          "Makes a property private",
          "Prevents a property from being modified",
          "Makes a property optional",
          "Makes a property public"
        ],
        correctIndex: 1,
        explanation: "The 'readonly' modifier prevents a property from being reassigned after initialization.",
      },
      {
        text: "What is the 'unknown' type?",
        options: [
          "Same as 'any'",
          "A type-safe version of 'any'",
          "An error type",
          "A null type"
        ],
        correctIndex: 1,
        explanation: "The 'unknown' type is like 'any' but requires type checking before use.",
      },
      {
        text: "How do you assert a type in TypeScript?",
        options: [
          "value as Type",
          "value: Type",
          "Type(value)",
          "(Type) value"
        ],
        correctIndex: 0,
        explanation: "Type assertions use the 'as' keyword (value as Type) or angle brackets (<Type>value).",
      },
      {
        text: "What is an intersection type?",
        options: [
          "A type that combines multiple types",
          "A type for common elements",
          "A type for null values",
          "A type for arrays"
        ],
        correctIndex: 0,
        explanation: "Intersection types combine multiple types into one using the & operator.",
      },
      {
        text: "What is the 'keyof' operator?",
        options: [
          "Gets the keys of a keyboard",
          "Gets the keys of a type as a union",
          "Creates a new key",
          "Deletes a key"
        ],
        correctIndex: 1,
        explanation: "The 'keyof' operator returns a union type of all property names of a type.",
      },
      {
        text: "What is a type guard?",
        options: [
          "A security feature",
          "A runtime check that narrows a type",
          "A type of error",
          "A type of function"
        ],
        correctIndex: 1,
        explanation: "Type guards are runtime checks that allow TypeScript to narrow down types within a scope.",
      },
      {
        text: "What is the 'Partial' utility type?",
        options: [
          "Makes all properties required",
          "Makes all properties optional",
          "Removes all properties",
          "Adds new properties"
        ],
        correctIndex: 1,
        explanation: "Partial<T> makes all properties of type T optional.",
      },
      {
        text: "What is the purpose of tsconfig.json?",
        options: [
          "To store TypeScript code",
          "To configure TypeScript compiler options",
          "To install TypeScript",
          "To run TypeScript tests"
        ],
        correctIndex: 1,
        explanation: "tsconfig.json configures TypeScript compiler options and project settings.",
      },
    ],
  },
  {
    name: "AWS Services",
    description: "Test your knowledge of AWS cloud services and concepts.",
    category: "Cloud",
    difficulty: "MEDIUM",
    questions: [
      {
        text: "What is Amazon S3?",
        options: [
          "A compute service",
          "An object storage service",
          "A database service",
          "A networking service"
        ],
        correctIndex: 1,
        explanation: "Amazon S3 (Simple Storage Service) is an object storage service for storing and retrieving data.",
      },
      {
        text: "What is AWS Lambda?",
        options: [
          "A virtual machine service",
          "A serverless compute service",
          "A container service",
          "A database service"
        ],
        correctIndex: 1,
        explanation: "AWS Lambda is a serverless compute service that runs code in response to events.",
      },
      {
        text: "What is Amazon EC2?",
        options: [
          "A storage service",
          "A virtual server service",
          "A database service",
          "A CDN service"
        ],
        correctIndex: 1,
        explanation: "Amazon EC2 (Elastic Compute Cloud) provides resizable virtual servers in the cloud.",
      },
      {
        text: "What is Amazon DynamoDB?",
        options: [
          "A relational database",
          "A NoSQL database service",
          "A file storage service",
          "A caching service"
        ],
        correctIndex: 1,
        explanation: "Amazon DynamoDB is a fully managed NoSQL database service for key-value and document data.",
      },
      {
        text: "What is Amazon CloudFront?",
        options: [
          "A computing service",
          "A content delivery network (CDN)",
          "A database service",
          "A messaging service"
        ],
        correctIndex: 1,
        explanation: "Amazon CloudFront is a CDN service that delivers content with low latency globally.",
      },
      {
        text: "What is AWS IAM?",
        options: [
          "A monitoring service",
          "An identity and access management service",
          "A database service",
          "A compute service"
        ],
        correctIndex: 1,
        explanation: "AWS IAM (Identity and Access Management) manages access to AWS services and resources.",
      },
      {
        text: "What is Amazon RDS?",
        options: [
          "A NoSQL database",
          "A managed relational database service",
          "A data warehouse",
          "A caching service"
        ],
        correctIndex: 1,
        explanation: "Amazon RDS (Relational Database Service) is a managed service for relational databases.",
      },
      {
        text: "What is Amazon VPC?",
        options: [
          "A storage service",
          "A virtual private cloud service",
          "A compute service",
          "A database service"
        ],
        correctIndex: 1,
        explanation: "Amazon VPC allows you to create an isolated virtual network in the AWS cloud.",
      },
      {
        text: "What is AWS Cognito used for?",
        options: [
          "Database management",
          "User authentication and authorization",
          "Server management",
          "File storage"
        ],
        correctIndex: 1,
        explanation: "AWS Cognito provides user sign-up, sign-in, and access control for applications.",
      },
      {
        text: "What is Amazon SNS?",
        options: [
          "A storage service",
          "A pub/sub messaging service",
          "A database service",
          "A compute service"
        ],
        correctIndex: 1,
        explanation: "Amazon SNS (Simple Notification Service) is a pub/sub messaging and notification service.",
      },
      {
        text: "What is AWS AppSync?",
        options: [
          "A file sync service",
          "A managed GraphQL service",
          "A mobile app store",
          "A code deployment service"
        ],
        correctIndex: 1,
        explanation: "AWS AppSync is a managed GraphQL service for building data-driven applications.",
      },
      {
        text: "What is Amazon SQS?",
        options: [
          "A storage service",
          "A message queuing service",
          "A compute service",
          "A database service"
        ],
        correctIndex: 1,
        explanation: "Amazon SQS (Simple Queue Service) is a fully managed message queuing service.",
      },
      {
        text: "What is AWS Amplify?",
        options: [
          "A speaker service",
          "A development platform for building apps",
          "A monitoring service",
          "A security service"
        ],
        correctIndex: 1,
        explanation: "AWS Amplify is a development platform for building secure, scalable mobile and web apps.",
      },
      {
        text: "What is Amazon CloudWatch?",
        options: [
          "A time service",
          "A monitoring and observability service",
          "A storage service",
          "A compute service"
        ],
        correctIndex: 1,
        explanation: "Amazon CloudWatch is a monitoring service for AWS resources and applications.",
      },
      {
        text: "What is an AWS Region?",
        options: [
          "A single data center",
          "A geographic area with multiple data centers",
          "A virtual network",
          "A storage bucket"
        ],
        correctIndex: 1,
        explanation: "An AWS Region is a geographic area containing multiple isolated Availability Zones.",
      },
    ],
  },
  {
    name: "General Programming",
    description: "Test your knowledge of general programming concepts and best practices.",
    category: "Programming",
    difficulty: "EASY",
    questions: [
      {
        text: "What is a variable?",
        options: [
          "A fixed value",
          "A container for storing data",
          "A type of function",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "A variable is a container for storing data values that can change during program execution.",
      },
      {
        text: "What is a function?",
        options: [
          "A type of variable",
          "A reusable block of code",
          "A data type",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "A function is a reusable block of code designed to perform a specific task.",
      },
      {
        text: "What is an array?",
        options: [
          "A single value",
          "An ordered collection of elements",
          "A type of function",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "An array is an ordered collection of elements, typically of the same type.",
      },
      {
        text: "What is a loop?",
        options: [
          "A single execution",
          "A structure that repeats code",
          "A type of variable",
          "An error"
        ],
        correctIndex: 1,
        explanation: "A loop is a control structure that repeats a block of code multiple times.",
      },
      {
        text: "What is a conditional statement?",
        options: [
          "A loop",
          "Code that executes based on a condition",
          "A variable declaration",
          "A function call"
        ],
        correctIndex: 1,
        explanation: "A conditional statement executes different code based on whether a condition is true or false.",
      },
      {
        text: "What is debugging?",
        options: [
          "Writing new code",
          "Finding and fixing errors in code",
          "Deleting code",
          "Running code"
        ],
        correctIndex: 1,
        explanation: "Debugging is the process of finding and fixing errors or bugs in code.",
      },
      {
        text: "What is an algorithm?",
        options: [
          "A programming language",
          "A step-by-step procedure to solve a problem",
          "A type of data",
          "A computer hardware"
        ],
        correctIndex: 1,
        explanation: "An algorithm is a step-by-step procedure or formula for solving a problem.",
      },
      {
        text: "What is OOP?",
        options: [
          "Object-Oriented Programming",
          "Only One Program",
          "Optional Operating Program",
          "Open Online Platform"
        ],
        correctIndex: 0,
        explanation: "OOP stands for Object-Oriented Programming, a paradigm based on objects and classes.",
      },
      {
        text: "What is a class in OOP?",
        options: [
          "A type of function",
          "A blueprint for creating objects",
          "A variable type",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "A class is a blueprint or template for creating objects with properties and methods.",
      },
      {
        text: "What is inheritance?",
        options: [
          "Copying code",
          "A mechanism where a class acquires properties of another class",
          "A type of loop",
          "An error handling technique"
        ],
        correctIndex: 1,
        explanation: "Inheritance allows a class to inherit properties and methods from another class.",
      },
      {
        text: "What is a data structure?",
        options: [
          "A programming language",
          "A way to organize and store data",
          "A type of function",
          "A debugging tool"
        ],
        correctIndex: 1,
        explanation: "A data structure is a way to organize, manage, and store data efficiently.",
      },
      {
        text: "What is recursion?",
        options: [
          "A loop type",
          "A function that calls itself",
          "A variable type",
          "An error"
        ],
        correctIndex: 1,
        explanation: "Recursion is when a function calls itself to solve smaller instances of a problem.",
      },
      {
        text: "What is API?",
        options: [
          "A programming language",
          "Application Programming Interface",
          "A database type",
          "A server type"
        ],
        correctIndex: 1,
        explanation: "API (Application Programming Interface) defines how software components should interact.",
      },
      {
        text: "What is version control?",
        options: [
          "A backup system",
          "A system for tracking changes in code",
          "A testing tool",
          "A deployment tool"
        ],
        correctIndex: 1,
        explanation: "Version control is a system for tracking and managing changes to code over time.",
      },
      {
        text: "What is Git?",
        options: [
          "A programming language",
          "A distributed version control system",
          "A database",
          "A web server"
        ],
        correctIndex: 1,
        explanation: "Git is a distributed version control system for tracking changes in source code.",
      },
      {
        text: "What is a boolean?",
        options: [
          "A number type",
          "A type that can be true or false",
          "A string type",
          "An array type"
        ],
        correctIndex: 1,
        explanation: "A boolean is a data type that can have only two values: true or false.",
      },
      {
        text: "What is a string?",
        options: [
          "A number",
          "A sequence of characters",
          "A boolean",
          "An array"
        ],
        correctIndex: 1,
        explanation: "A string is a sequence of characters used to represent text.",
      },
      {
        text: "What is syntax?",
        options: [
          "A type of error",
          "The rules that define the structure of code",
          "A programming language",
          "A data type"
        ],
        correctIndex: 1,
        explanation: "Syntax refers to the rules that define how code must be written in a programming language.",
      },
      {
        text: "What is a compiler?",
        options: [
          "A text editor",
          "A program that translates code to machine language",
          "A debugging tool",
          "A web browser"
        ],
        correctIndex: 1,
        explanation: "A compiler translates source code into machine code that the computer can execute.",
      },
      {
        text: "What is an IDE?",
        options: [
          "A programming language",
          "Integrated Development Environment",
          "A data type",
          "A version control system"
        ],
        correctIndex: 1,
        explanation: "An IDE (Integrated Development Environment) is software for writing, testing, and debugging code.",
      },
      {
        text: "What is a bug?",
        options: [
          "A feature",
          "An error or flaw in code",
          "A type of variable",
          "A programming language"
        ],
        correctIndex: 1,
        explanation: "A bug is an error, flaw, or unintended behavior in a computer program.",
      },
      {
        text: "What is refactoring?",
        options: [
          "Adding new features",
          "Restructuring code without changing behavior",
          "Fixing bugs",
          "Deleting code"
        ],
        correctIndex: 1,
        explanation: "Refactoring is restructuring existing code without changing its external behavior.",
      },
      {
        text: "What is a stack data structure?",
        options: [
          "First-In-First-Out (FIFO)",
          "Last-In-First-Out (LIFO)",
          "Random access",
          "Sorted order"
        ],
        correctIndex: 1,
        explanation: "A stack follows Last-In-First-Out (LIFO) principle - the last element added is the first removed.",
      },
      {
        text: "What is a queue data structure?",
        options: [
          "Last-In-First-Out (LIFO)",
          "First-In-First-Out (FIFO)",
          "Random access",
          "Sorted order"
        ],
        correctIndex: 1,
        explanation: "A queue follows First-In-First-Out (FIFO) principle - the first element added is the first removed.",
      },
      {
        text: "What is Big O notation?",
        options: [
          "A programming style",
          "A way to describe algorithm efficiency",
          "A data type",
          "An error type"
        ],
        correctIndex: 1,
        explanation: "Big O notation describes the performance or complexity of an algorithm.",
      },
    ],
  },
];

async function seed() {
  console.log("Starting seed process...\n");

  for (const setData of questionSets) {
    console.log(`Creating question set: ${setData.name}`);

    try {
      // Create the question set
      const { data: questionSet, errors: setErrors } =
        await client.models.QuestionSet.create({
          name: setData.name,
          description: setData.description,
          category: setData.category,
          difficulty: setData.difficulty,
          isActive: true,
        });

      if (setErrors || !questionSet) {
        console.error(`Failed to create question set: ${setData.name}`, setErrors);
        continue;
      }

      console.log(`  Created set with ID: ${questionSet.id}`);

      // Create questions for this set
      for (let i = 0; i < setData.questions.length; i++) {
        const q = setData.questions[i];
        const { data: question, errors: qErrors } =
          await client.models.Question.create({
            questionSetId: questionSet.id,
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
          });

        if (qErrors || !question) {
          console.error(`  Failed to create question ${i + 1}`, qErrors);
        }
      }

      console.log(`  Added ${setData.questions.length} questions\n`);
    } catch (error) {
      console.error(`Error creating ${setData.name}:`, error);
    }
  }

  console.log("Seed complete!");
}

seed().catch(console.error);
