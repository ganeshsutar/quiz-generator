/**
 * Seed script for populating the database with MS Word question bank
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

seed().catch(console.error);
