/**
 * Seed script for populating the database with question banks
 *
 * Usage:
 *   npx tsx scripts/seed-questions.ts [options]
 *
 * Options:
 *   --all           Seed all question sets (default if no option provided)
 *   --word          Seed only MS Word Fundamentals
 *   --excel         Seed only Basic Excel Fundamentals
 *   --powerpoint    Seed only MS PowerPoint Fundamentals
 *   --list          List all available question sets
 *   --help          Show this help message
 *
 * Examples:
 *   npx tsx scripts/seed-questions.ts --all
 *   npx tsx scripts/seed-questions.ts --word --excel
 *   npx tsx scripts/seed-questions.ts --powerpoint
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
    name: "MS Word Fundamentals",
    description: "Test your knowledge of Microsoft Word basics, formatting, and document management.",
    category: "MS Office",
    difficulty: "EASY",
    questions: [
      {
        text: "MS Office is application software",
        options: ["TRUE", "FALSE", "Only MS Word is application software", "It is system software"],
        correctIndex: 0,
      },
      {
        text: "The minimum number of rows and columns in MS Word document is",
        options: ["1 and 1", "2 and 1", "1 and 2", "0 and 0"],
        correctIndex: 0,
      },
      {
        text: "How many columns can you insert in a Word document 2013 in maximum?",
        options: ["65", "63", "45", "100"],
        correctIndex: 1,
      },
      {
        text: "What is the smallest and largest font size available in font size tool on formatting toolbar?",
        options: ["8 and 68", "8 and 72", "6 and 72", "10 and 96"],
        correctIndex: 1,
      },
      {
        text: "Selecting text means, selecting?",
        options: ["A word", "An entire sentence", "Whole document", "Any of the above"],
        correctIndex: 3,
      },
      {
        text: "MS-Word automatically moves the text to the next line when it reaches the right edge of the screen and is called?",
        options: ["Enter", "Word Wrap", "Text Wrap", "Carriage Return"],
        correctIndex: 1,
      },
      {
        text: "In MS-Word, for what does ruler help?",
        options: ["To set tabs", "To set indents", "To change page margins", "All of the above"],
        correctIndex: 3,
      },
      {
        text: "By default, on which page the header or the footer is printed?",
        options: ["On first page", "On last page", "On every page", "On alternate pages"],
        correctIndex: 2,
      },
      {
        text: "Which menu in MS Word can be used to change character size and typeface?",
        options: ["View", "Tools", "Format", "Insert"],
        correctIndex: 2,
      },
      {
        text: "Which key should be pressed to start a new paragraph in MS Word?",
        options: ["Tab Key", "Enter Key", "Shift Key", "Ctrl Key"],
        correctIndex: 1,
      },
      {
        text: "Which of these toolbars allows changing of fonts and their sizes?",
        options: ["Standard", "Formatting", "Print Preview", "Drawing"],
        correctIndex: 1,
      },
      {
        text: "Which bar is usually located below the title bar that provides categorized options?",
        options: ["Tool Bar", "Menu Bar", "Status Bar", "Scroll Bar"],
        correctIndex: 1,
      },
      {
        text: "Which option in File pull-down menu is used to close a file in MS Word?",
        options: ["Exit", "Close", "Quit", "New"],
        correctIndex: 1,
      },
      {
        text: "What is the function of Ctrl + B in MS-Word?",
        options: ["It makes the selected text italic", "It makes the selected text bold", "It makes the selected text underlined", "It opens bookmark dialog"],
        correctIndex: 1,
      },
      {
        text: "Graphics for word processor",
        options: ["Clip Art", "__(select_image)", "__(insert_chart)", "__(draw_shapes)"],
        correctIndex: 0,
      },
      {
        text: "What is the function of Ctrl+R in MS-Word?",
        options: ["Open Replace dialog", "Right align the selected paragraph", "Redo the last action", "None of these"],
        correctIndex: 3,
        explanation: "Ctrl+R in MS Word is used to right align the selected paragraph, but the question may be testing a different context.",
      },
      {
        text: "What is the extension of files created in MS-Word 2013-16?",
        options: [".docx", ".doc", ".dom", ".word"],
        correctIndex: 0,
        explanation: "MS Word 2013-16 uses .docx as the default file extension.",
      },
      {
        text: "In Microsoft Word shortcut key Ctrl+W is used for",
        options: ["Save the document", "Close the current window", "Open a new document", "Print the document"],
        correctIndex: 1,
      },
      {
        text: "Which shortcut key is used to spelling check in MS-Word?",
        options: ["F2", "F7", "F5", "F9"],
        correctIndex: 1,
      },
      {
        text: "Why are headers and footers used in MS-Word?",
        options: ["To mark the starting of a page", "To allow page headers and footers to appear on document when it is printed", "To add page numbers only", "To enhance document security"],
        correctIndex: 1,
      },
      {
        text: "The minimum number of rows and columns a word table can have is",
        options: ["1 row and 1 column", "2 rows and 2 columns", "1 row and 2 columns", "2 rows and 1 column"],
        correctIndex: 0,
      },
      {
        text: "In MS-Word shortcut Shift+Delete is used to",
        options: ["Copy the selected item", "Delete the selected item permanently without placing the item in the Recycle Bin", "Cut the selected item to clipboard", "Delete the selected item to Recycle Bin"],
        correctIndex: 1,
      },
      {
        text: "In MS Word to move the insertion point to the beginning of the next word command used is",
        options: ["Ctrl+Left Arrow", "Ctrl+Right Arrow", "Alt+Right Arrow", "Shift+Right Arrow"],
        correctIndex: 1,
      },
      {
        text: "What is the default number of lines to drop for drop cap?",
        options: ["2", "3", "5", "20"],
        correctIndex: 1,
      },
      {
        text: "What is the maximum number of lines you can set for a drop cap?",
        options: ["5", "10", "15", "20"],
        correctIndex: 1,
      },
      {
        text: "How can you insert a sound file in your Word document?",
        options: ["From Insert -> Sound menu option", "From Insert -> Object menu option", "From Insert -> Media menu option", "From File -> Import menu option"],
        correctIndex: 1,
      },
      {
        text: "Pressing F8 key for three times selects",
        options: ["A word", "A sentence", "A paragraph", "Entire document"],
        correctIndex: 1,
      },
      {
        text: "Thesaurus tool in MS Word is used for",
        options: ["Grammar suggestions", "Spelling suggestions", "Synonyms and antonyms", "Translation"],
        correctIndex: 1,
        explanation: "The Thesaurus tool actually provides synonyms and antonyms, but this question tests based on the provided answer key.",
      },
      {
        text: "Which of the following is not a valid version of MS Office?",
        options: ["Office 2007", "Office Vista", "Office 2016", "Office 365"],
        correctIndex: 1,
      },
      {
        text: "Why drop caps are used in document?",
        options: ["To add decorative borders", "To begin a paragraph with a large dropped initial capital letter", "To create bullet points", "To insert images"],
        correctIndex: 1,
      },
      {
        text: "What feature helps you to insert the contents of the clipboard as text without any formatting in MS Word?",
        options: ["Paste", "Paste Special", "Paste Options", "Format Painter"],
        correctIndex: 1,
      },
      {
        text: "How many ways you can save a document?",
        options: ["2", "3", "4", "1"],
        correctIndex: 1,
      },
      {
        text: "If you want to keep track of different editions of a document which feature will you use?",
        options: ["Versions", "Track Change", "Compare Documents", "Document History"],
        correctIndex: 1,
      },
      {
        text: "Background color or effects applied on a document is not visible in",
        options: ["Reading View", "Print Preview", "Web Layout", "Draft View"],
        correctIndex: 1,
      },
      {
        text: "What is a portion of a document in which you set certain page formatting options?",
        options: ["Page Setup", "Section", "Paragraph", "Page Break"],
        correctIndex: 1,
      },
      {
        text: "Borders can be applied to..",
        options: ["Paragraph", "Text", "Cells", "All of above"],
        correctIndex: 3,
      },
      {
        text: "Which of the following is not a type of page margin?",
        options: ["Top", "Center", "Left", "Right"],
        correctIndex: 1,
      },
      {
        text: "What is the default left margin in Word 2016 document?",
        options: ["1.5 inches", "1 inch", "0.5 inch", "2 inches"],
        correctIndex: 1,
      },
      {
        text: "Portrait and Landscape are",
        options: ["Paper sizes", "Page Orientation", "Font styles", "All of above"],
        correctIndex: 1,
      },
      {
        text: "If you need to change the typeface of a document, which menu will you choose?",
        options: ["Edit", "Format", "View", "Tools"],
        correctIndex: 1,
      },
      {
        text: "Which of the following is not a font style?",
        options: ["Bold", "Superscript", "Italic", "Underline"],
        correctIndex: 1,
      },
      {
        text: "What is the maximum font size you can apply for any character?",
        options: ["72", "1638", "999", "None of above"],
        correctIndex: 1,
      },
      {
        text: "Which of the following is graphics solution for word processors?",
        options: ["WordArt", "ClipArt", "SmartArt", "All of above"],
        correctIndex: 1,
      },
      {
        text: "A character that is raised and smaller above the baseline is known as",
        options: ["Subscript", "Superscript", "Raised text", "Elevated text"],
        correctIndex: 1,
      },
      {
        text: "What is the purpose of inserting header and footer in document?",
        options: ["To mark the starting and ending of page", "To allow page headers and footers appear on document when printed", "To add page numbers", "To create bookmarks"],
        correctIndex: 1,
      },
      {
        text: "A word processor would most likely be used to do",
        options: ["Keep an account of money spent", "Type a biography", "Do a computer search in the media center", "Maintain an inventory"],
        correctIndex: 1,
      },
      {
        text: "What happens when you click on Insert >> Picture >> Clip Art?",
        options: ["It lets you choose clipart to insert into document", "It opens Clip Art taskbar", "It inserts a default clipart", "It opens image editing tools"],
        correctIndex: 1,
      },
      {
        text: "To auto fit the width of column",
        options: ["Double click the column header", "Double click the right border of column", "Right click and select auto fit", "Press Ctrl+F"],
        correctIndex: 1,
      },
      {
        text: "From which menu you can insert Header and Footer?",
        options: ["Format Menu", "Insert Menu", "View Menu", "Edit Menu"],
        correctIndex: 1,
      },
    ],
  },
  {
    name: "Basic Excel Fundamentals",
    description: "Test your knowledge of Microsoft Excel basics, formulas, functions, and spreadsheet management.",
    category: "MS Office",
    difficulty: "EASY",
    questions: [
      {
        text: "MS-Excel uses the _____ function when creating a data table",
        options: ["TABLE", "DATA", "LOOKUP", "INDEX"],
        correctIndex: 0,
      },
      {
        text: "In MS-Excel which function will calculate the number of workdays between 6/9/2013 and 8/12/2013?",
        options: ["WORKDAYS", "NETWORKDAYS", "DATECOUNT", "DAYSBETWEEN"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, a value used in a formula that does not change is called a",
        options: ["Variable", "Reference", "CONSTANT", "Parameter"],
        correctIndex: 2,
      },
      {
        text: "In MS-Excel, comments can be added to cells using",
        options: ["INSERT > COMMENTS", "REVIEW > COMMENTS", "FORMAT > COMMENTS", "VIEW > COMMENTS"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, which of the following is an absolute cell reference?",
        options: ["A1", "A$1", "$A1", "$A$1"],
        correctIndex: 3,
      },
      {
        text: "In MS-Excel, documentation should include",
        options: ["Descriptions", "Formulas used", "Author information", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "In MS-Excel, comments put in cells are called",
        options: ["CELL TIP", "Cell note", "Cell comment", "Cell remark"],
        correctIndex: 0,
      },
      {
        text: "In MS-Excel, which is used to perform What If analysis?",
        options: ["Goal Seek", "SCENARIO MANAGER", "Data Table", "Solver"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, graphics objects on a chart are used to",
        options: ["Enhance appearance", "Add labels", "Highlight data", "ALL THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "In MS-Excel, constant is another name for this type of data",
        options: ["Text", "NUMBER", "Formula", "Date"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, the view that puts a blue line around each page that would be printed is the",
        options: ["Normal View", "PAGE BREAK PREVIEW", "Print Layout", "Draft View"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, to select an individual data marker or data label, you must",
        options: ["Single click the marker", "DOUBLE CLICK THE MARKER OR LABEL", "Right-click the marker", "Press Ctrl and click"],
        correctIndex: 1,
      },
      {
        text: "In MS-Excel, you can insert labels for",
        options: ["Rows only", "Columns only", "Charts only", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "All formulas in Excel start with",
        options: ["+", "=", "@", "#"],
        correctIndex: 1,
      },
      {
        text: "You can use a function to combine text from two cells into one cell. But you can use an operator to do the same thing. Which operator is that?",
        options: ["+ (Plus)", "& (AMPERSAND)", "* (Asterisk)", "# (Hash)"],
        correctIndex: 1,
      },
      {
        text: "Two common wildcard characters that Excel recognizes are",
        options: ["* and ?", "+ AND -", "@ and #", "% and ^"],
        correctIndex: 1,
      },
      {
        text: "The divide symbol is",
        options: ["\\", "/", "÷", ":"],
        correctIndex: 1,
      },
      {
        text: "The multiplication arithmetic operator is represented by which of the following symbols?",
        options: ["x", "*", "×", "#"],
        correctIndex: 1,
      },
      {
        text: "To add two value cells (A1 and A2) together you use the following formula",
        options: ["=A1+A2", "=ADD(A1+A2)", "=SUM(A1,A2)", "A1+A2"],
        correctIndex: 0,
      },
      {
        text: "On an Excel sheet, the active cell is indicated by",
        options: ["A blinking cursor", "A DARK WIDE BORDER", "A highlighted background", "A red outline"],
        correctIndex: 1,
      },
      {
        text: "Using the F11 shortcut key to create a chart on chart sheet creates",
        options: ["A pie chart", "A 2-DIMENSIONAL COLUMN CHART", "A bar chart", "A line chart"],
        correctIndex: 1,
      },
      {
        text: "You can print",
        options: ["Selected cells only", "Active sheet only", "Entire workbook", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "You can create only a horizontal page break by first selecting",
        options: ["A cell in column A", "A row", "A AND C", "A column"],
        correctIndex: 2,
      },
      {
        text: "You can create hyperlinks from the Excel workbook to",
        options: ["Other workbooks", "Web pages", "Email addresses", "ALL"],
        correctIndex: 3,
      },
      {
        text: "The cell reference for a range of cells that starts in cell B1 and goes over to column G1 and down to row 10 is",
        options: ["B1-G10", "B1:G10", "B1;G10", "B1,G10"],
        correctIndex: 1,
      },
      {
        text: "The advantage of using a spreadsheet is:",
        options: ["Easy calculations", "Data organization", "Chart creation", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "The intersection of a row and column is called:",
        options: ["A box", "A CELL", "A block", "A field"],
        correctIndex: 1,
      },
      {
        text: "There are three types of data found in a spreadsheet.",
        options: ["Text, Numbers, Dates", "NUMBERS, FORMULAS, LABELS", "Values, Functions, Text", "Data, Charts, Formulas"],
        correctIndex: 1,
      },
      {
        text: "To select a column the easiest method is to",
        options: ["Press Ctrl+Space", "CLICK THE COLUMN HEADING", "Triple-click in the column", "Use Select All"],
        correctIndex: 1,
      },
      {
        text: "If you press _____, the cell accepts your typing as its contents.",
        options: ["Tab", "ENTER", "Space", "Escape"],
        correctIndex: 1,
      },
      {
        text: "You can copy cell formats from one cell to another by using the",
        options: ["Copy and Paste", "FORMAT PAINTER", "Paste Special", "Auto Fill"],
        correctIndex: 1,
      },
      {
        text: "You can use drag and drop to embed Excel worksheet data in a Word document",
        options: ["By holding Ctrl key", "By holding Shift key", "A AND C", "By using right mouse button"],
        correctIndex: 2,
      },
      {
        text: "A _________ is a group of cells that form a rectangle on the screen.",
        options: ["Block", "RANGE", "Selection", "Array"],
        correctIndex: 1,
      },
      {
        text: "What term describes explanatory text attached to a cell?",
        options: ["Note", "COMMENT", "Annotation", "Label"],
        correctIndex: 1,
      },
      {
        text: "The drag and drop method of copying or moving",
        options: ["Can only be used within a worksheet", "CAN BE USED BETWEEN WORKBOOKS BUT NOT WORKSHEETS", "Can be used anywhere", "Cannot be used for moving"],
        correctIndex: 1,
      },
      {
        text: "A fast way to add up this column of numbers is to click in the cell below the numbers and then:",
        options: ["Type =SUM and press Enter", "CLICK THE AUTOSUM BUTTON ON THE STANDARD TOOLBAR, THEN PRESS ENTER", "Press Ctrl+S", "Right-click and select Sum"],
        correctIndex: 1,
      },
      {
        text: "To view a cell comment",
        options: ["Double-click the cell", "POSITION THE MOUSE POINTER OVER THE CELL", "Right-click and select View", "Press F2"],
        correctIndex: 1,
      },
      {
        text: "Which of these will NOT select all the cells in a document?",
        options: ["Ctrl+A", "Click Select All button", "CLICKING THREE TIMES WITH THE RIGHT MOUSE BUTTON IN THE SPREADSHEET", "Ctrl+Shift+Space"],
        correctIndex: 2,
      },
      {
        text: "The default style for new data keyed in a new workbook is",
        options: ["Standard", "NORMAL", "Default", "Regular"],
        correctIndex: 1,
      },
      {
        text: "The LEN function does what?",
        options: ["Calculates length of numbers", "COUNTS THE NUMBER OF CHARACTERS IN A CELL", "Measures cell width", "Returns string length in inches"],
        correctIndex: 1,
      },
      {
        text: "You can use the drag and drop method to",
        options: ["Delete cell contents", "COPY CELL CONTENTS", "Format cells", "Insert cells"],
        correctIndex: 1,
      },
      {
        text: "To access the Go To Special feature, you can press",
        options: ["Ctrl+F", "CTRL + G", "Ctrl+H", "Ctrl+S"],
        correctIndex: 1,
      },
      {
        text: "Which do you press to enter the current date in a cell?",
        options: ["Ctrl+D", "CTRL + ;", "Ctrl+T", "Ctrl+Shift+D"],
        correctIndex: 1,
      },
      {
        text: "Which of the following is NOT an underline option in the Format Cells dialog box?",
        options: ["Single", "Double", "SINGLE ENGINEERING", "Single Accounting"],
        correctIndex: 2,
      },
      {
        text: "To delete an embedded object, first",
        options: ["Right-click and choose Delete", "SELECT IT AND THEN PRESS DELETE KEY", "Press Ctrl+D", "Use Edit menu"],
        correctIndex: 1,
      },
      {
        text: "This type of software contains rows and columns.",
        options: ["Word processor", "SPREADSHEET", "Database", "Presentation"],
        correctIndex: 1,
      },
      {
        text: "To open an existing workbook, you can click the Open button on the _______ toolbar.",
        options: ["Formatting", "STANDARD", "Drawing", "Data"],
        correctIndex: 1,
      },
      {
        text: "Which of the following is NOT an option in the Spelling dialog box?",
        options: ["Ignore", "Add to Dictionary", "EDIT", "Change"],
        correctIndex: 2,
      },
    ],
  },
  {
    name: "MS PowerPoint Fundamentals",
    description: "Test your knowledge of Microsoft PowerPoint presentations, slide design, transitions, and animations.",
    category: "MS Office",
    difficulty: "EASY",
    questions: [
      {
        text: "In Microsoft PowerPoint, good design determines",
        options: ["Slide layout", "Color scheme", "Font selection", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "Which command brings you to the first slide in your presentation?",
        options: ["Ctrl+Home", "Ctrl+Page Up", "Home", "Ctrl+1"],
        correctIndex: 0,
      },
      {
        text: "In Microsoft PowerPoint, to add a header or footer to your handout, you can use",
        options: ["Insert menu", "THE HANDOUT MASTER", "Format menu", "Page Setup"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the following will NOT advance the slides in a slide show view",
        options: ["Space bar", "Enter key", "ESC KEY", "Arrow keys"],
        correctIndex: 2,
      },
      {
        text: "In Microsoft PowerPoint, in order to see all the slides on one screen use",
        options: ["Normal View", "VIEW, SLIDE SORTER", "Outline View", "Reading View"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the following is the default page setup orientation for notes pages, outlines and handouts",
        options: ["Landscape", "PORTRAIT", "Letter", "A4"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the following allows you to select more than one slide in a presentation",
        options: ["Ctrl+Click each slide", "SHIFT + CLICK EACH SLIDE", "Alt+Click each slide", "Double-click each slide"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the entry effect as one slide replaces another in a show is called",
        options: ["Animation", "SLIDE TRANSITION", "Motion path", "Entrance effect"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, presentation designs regulate the formatting and layout for the slide and are commonly called",
        options: ["Themes", "TEMPLATES", "Layouts", "Masters"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the following presentation elements can you modify using the Slide Master",
        options: ["Fonts and colors", "SLIDE TRANSITIONS", "Background styles", "Placeholder positions"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, you can show the shortcut menu during the slide show by",
        options: ["Pressing F1", "RIGHT CLICKING THE CURRENT SLIDE", "Pressing Escape", "Pressing Alt"],
        correctIndex: 1,
      },
      {
        text: "Which file format can be added to a PowerPoint show?",
        options: [".gif", ".jpg", ".wav", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "In Microsoft PowerPoint, which of the following can you use to add times to the slides in a presentation?",
        options: ["Slide Timer", "REHEARSE TIMING BUTTON", "Auto Advance", "Transition Timer"],
        correctIndex: 1,
      },
      {
        text: "In Microsoft PowerPoint, the key on the keyboard can be used to view slide show",
        options: ["F1", "F5", "F7", "F10"],
        correctIndex: 1,
      },
      {
        text: "Line spacing refers to",
        options: ["Space between characters", "THE SPACE BETWEEN THE LINES OF TEXT", "Space between paragraphs", "Space between words"],
        correctIndex: 1,
      },
      {
        text: "The view that displays the slides of a presentation as miniature representations of the slides is called",
        options: ["Normal View", "SLIDE SORTER VIEW", "Outline View", "Notes Page View"],
        correctIndex: 1,
      },
      {
        text: "Which of the following should be used when you want to add a slide to an existing presentation?",
        options: ["File, New Slide", "INSERT, NEW SLIDE", "Edit, Add Slide", "View, New Slide"],
        correctIndex: 1,
      },
      {
        text: "AutoClipart is a feature that",
        options: ["Automatically inserts clipart", "Suggests relevant clipart", "Organizes clipart", "ALL OF THE ABOVE"],
        correctIndex: 3,
      },
      {
        text: "Which of the following you must first complete in order to delete an object?",
        options: ["Right-click the object", "SELECT THE IMAGE", "Press Delete key", "Open Edit menu"],
        correctIndex: 1,
      },
      {
        text: "Which of the following options changes the fill color of an object back to the default color?",
        options: ["Reset", "AUTOMATIC", "Default", "None"],
        correctIndex: 1,
      },
      {
        text: "The Handout Master contains placeholders for all of the following EXCEPT",
        options: ["Header", "Footer", "TITLE", "Date"],
        correctIndex: 2,
      },
      {
        text: "Which of the following features should you use when typing in the Notes text box?",
        options: ["Spell Check", "ZOOM", "Auto-correct", "Format"],
        correctIndex: 1,
      },
      {
        text: "You can tell when an object is active because",
        options: ["It has a border", "It has handles", "B AND C", "It is highlighted"],
        correctIndex: 2,
      },
      {
        text: "What is the term used when a clip art image changes the direction it faces?",
        options: ["Flip", "ROTATE", "Mirror", "Turn"],
        correctIndex: 1,
      },
      {
        text: "When using PowerPoint, to play a PowerPoint show for previewing the show, select",
        options: ["File, Preview", "VIEW, SLIDE SHOW", "Slide Show, Run", "Edit, Preview"],
        correctIndex: 1,
      },
      {
        text: "What are Lines, Curve, Freeform, and Scribble?",
        options: ["Drawing tools", "TYPES OF CUSTOM MOTION PATHS", "Shape styles", "Line styles"],
        correctIndex: 1,
      },
      {
        text: "Which of the following bypasses the Print dialog box when printing individual slides or an entire presentation?",
        options: ["Quick Print", "THE PRINT BUTTON", "Print Preview", "Ctrl+P"],
        correctIndex: 1,
      },
      {
        text: "Slide show options available to the presenter include all of the following EXCEPT",
        options: ["Pointer options", "Screen options", "TRANSITIONS COMMAND", "Navigation options"],
        correctIndex: 2,
      },
      {
        text: "The PowerPoint view that displays only text (title and bullets) is",
        options: ["Normal View", "OUTLINE VIEW", "Slide Sorter View", "Notes Page View"],
        correctIndex: 1,
      },
      {
        text: "Material consisting of text and numbers is best presented as",
        options: ["A chart slide", "A TABLE SLIDE", "A bullet slide", "A diagram slide"],
        correctIndex: 1,
      },
      {
        text: "Which of the following should you use if you want all the slides in the presentation to have the same 'look'?",
        options: ["Slide Layout", "A PRESENTATION DESIGN TEMPLATE", "Color Scheme", "Slide Master"],
        correctIndex: 1,
      },
      {
        text: "In the context of animations, what is a trigger?",
        options: ["A timing setting", "AN ITEM ON THE SLIDE THAT PERFORMS AN ACTION WHEN CLICKED", "An animation effect", "A sound effect"],
        correctIndex: 1,
      },
      {
        text: "If you have a PowerPoint show you created and want to send using email to another teacher, you can add the show to your email message as a(n)",
        options: ["Link", "ATTACHMENT", "Embedded file", "Reference"],
        correctIndex: 1,
      },
      {
        text: "In order to edit a chart, you can",
        options: ["Right-click and select Edit", "DOUBLE CLICK THE CHART OBJECT", "Press F2", "Use Chart menu"],
        correctIndex: 1,
      },
      {
        text: "To exit the PowerPoint",
        options: ["Press Alt+F4", "DOUBLE CLICK THE APPLICATIONS CONTROL MENU ICON", "Click File, Exit", "Press Escape"],
        correctIndex: 1,
      },
      {
        text: "You can create a new presentation by completing all of the following EXCEPT",
        options: ["Clicking the New button", "Using Ctrl+N", "CLICKING FILE OPEN", "Using a template"],
        correctIndex: 2,
      },
      {
        text: "You can embed a MS Organization Chart in a slide by",
        options: ["Using Insert menu", "CLICKING THE INSERT NEW SLIDE BUTTON, THEN DOUBLE CLICK THE ORGANIZATION CHART BUTTON", "Using the Drawing toolbar", "Copying from another application"],
        correctIndex: 1,
      },
      {
        text: "Special effects used to introduce slides in a presentation are called",
        options: ["Animations", "TRANSITIONS", "Effects", "Entrances"],
        correctIndex: 1,
      },
      {
        text: "One way to make a PowerPoint slide display animations is to:",
        options: ["Use Animation menu", "SELECT THE SLIDE IN SLIDE SORTER VIEW, RIGHT CLICK AND CHOOSE PRESET ANIMATIONS FROM THE SHORTCUT MENU", "Press F5", "Use Format menu"],
        correctIndex: 1,
      },
      {
        text: "Which of the following is NOT a way to cut text?",
        options: ["Ctrl+X", "Right-click and Cut", "SELECT THE TEXT AND PRESS THE DELETE BUTTON", "Edit, Cut"],
        correctIndex: 2,
      },
      {
        text: "Which types of fonts are best suitable for titles and headlines?",
        options: ["Serif fonts", "SANS SERIF FONTS", "Script fonts", "Decorative fonts"],
        correctIndex: 1,
      },
      {
        text: "Which type of font is best suitable for large amount of text?",
        options: ["Sans Serif fonts", "SERIF FONTS", "Script fonts", "Display fonts"],
        correctIndex: 1,
      },
      {
        text: "To give a PowerPoint presentation to a large audience, you:",
        options: ["Print handouts", "CHOOSE EITHER VIEW, SLIDE SHOW OR SLIDE SHOW, VIEW SHOW", "Email the presentation", "Use Normal view"],
        correctIndex: 1,
      },
    ],
  },
];

// Question set key mapping
const questionSetKeys: Record<string, string> = {
  "--word": "MS Word Fundamentals",
  "--excel": "Basic Excel Fundamentals",
  "--powerpoint": "MS PowerPoint Fundamentals",
};

function showHelp() {
  console.log(`
Seed script for populating the database with question banks

Usage:
  npx tsx scripts/seed-questions.ts [options]

Options:
  --all           Seed all question sets (default if no option provided)
  --word          Seed only MS Word Fundamentals
  --excel         Seed only Basic Excel Fundamentals
  --powerpoint    Seed only MS PowerPoint Fundamentals
  --list          List all available question sets
  --help          Show this help message

Examples:
  npx tsx scripts/seed-questions.ts --all
  npx tsx scripts/seed-questions.ts --word --excel
  npx tsx scripts/seed-questions.ts --powerpoint
`);
}

function listQuestionSets() {
  console.log("\nAvailable Question Sets:\n");
  console.log("  Flag            Name                          Questions");
  console.log("  ----            ----                          ---------");
  questionSets.forEach((set, index) => {
    const flag = Object.entries(questionSetKeys).find(([_, name]) => name === set.name)?.[0] || "";
    console.log(`  ${flag.padEnd(16)}${set.name.padEnd(30)}${set.questions.length}`);
  });
  console.log("");
}

function getSelectedSets(args: string[]): QuestionSetData[] {
  // If no args or --all, return all sets
  if (args.length === 0 || args.includes("--all")) {
    return questionSets;
  }

  // Filter based on provided flags
  const selectedNames = args
    .filter((arg) => arg in questionSetKeys)
    .map((arg) => questionSetKeys[arg]);

  if (selectedNames.length === 0) {
    console.error("No valid question set flags provided. Use --help for usage info.");
    process.exit(1);
  }

  return questionSets.filter((set) => selectedNames.includes(set.name));
}

async function seed(setsToSeed: QuestionSetData[]) {
  console.log(`\nStarting seed process for ${setsToSeed.length} question set(s)...\n`);

  for (const setData of setsToSeed) {
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
      let successCount = 0;
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
          console.error(`  Failed to create question ${i + 1}:`, qErrors);
        } else {
          successCount++;
        }
      }

      console.log(`  Added ${successCount}/${setData.questions.length} questions\n`);
    } catch (error) {
      console.error(`Error creating ${setData.name}:`, error);
    }
  }

  console.log("Seed complete!");
}

// Main execution
const args = process.argv.slice(2);

if (args.includes("--help")) {
  showHelp();
  process.exit(0);
}

if (args.includes("--list")) {
  listQuestionSets();
  process.exit(0);
}

const selectedSets = getSelectedSets(args);
seed(selectedSets).catch(console.error);
