module Configuration
    exposing
        ( adminUsername
        , autosaveDuration
        , backend
        , basicDocumentText
        , bucket
        , client
        , coverArtUrl
        , debounceDelay
        , newMiniLatexDocumentText
        , newUserText
        , signInText
        , signedOutText
        , signedUpText
        , timeout
        , userManualId
        , welcomeText
        )


adminUsername : String
adminUsername =
    "jxxcarlson"


timeout : Float
timeout =
    20000


backend : String
backend =
    "http://localhost:4000"



--  "https://nshost.herokuapp.com"


client : String
client = "https://knode.io"
   -- "http://localhost:8080"



--


bucket : String
bucket =
    "noteimages"


autosaveDuration : Float
autosaveDuration =
    8 * 1000



-- in milliseconds


debounceDelay : Float
debounceDelay =
    250


coverArtUrl : String
coverArtUrl =
    "http://noteimages.s3.amazonaws.com/app_images/robin2.jpg"


userManualId : Int
userManualId =
    750



-- TEXT


signInText =
    """
This is localhost:8000, ready to run MiniLatex, Asciidoc, or Markdown.

$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$

Click on \\strong{Home} to go to your home page
"""


signedOutText : String
signedOutText =
    """
You are now signed out. See you later.
"""


signedUpText : String
signedUpText =
    """
Welcome to localhost:8000.  We are ready to run MiniLatex, Asciidoc, or Markdown for you

$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$

Click on \\strong{Home} to go to your home page.
Click on \\strong{Write} to create or edit a document.
"""


newMiniLatexDocumentText =
    """
    NEW DOCUMENT: WRITE YOUR TEXT HERE
"""


newMiniLatexDocumentText1 =
    """
\\tableofcontents

\\section{Examples}

This is a sample document with a few MiniLatex examples.
Click on \\strong{Edit attributes} to change the title
and other document attributes.

\\subsection{A formula}

$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$


\\subsection{An image}

\\image{http://noteimages.s3.amazonaws.com/uploads/butterfly.jpg}{}{width: 450}

\\subsection{A hyperlink}

\\href{\\https://nytimes.com}{The New York Times}
"""


basicDocumentText =
    """
This is \\strong{localhost:8000}, ready to run MiniLatex,
Asciidoc, Markdown, or just plain old text.

$$\\int_0^1 x^n dx = \\frac{1}{n+1}$$

Write formulas, place images, etc.
Edit live and publish to the web in real time. Lecture notes, poetry, whatever.
Click on \\strong{Home} to go to your home page.


\\bigskip

\\image{http://noteimages.s3.amazonaws.com/uploads/butterfly.jpg}{}{width: 450}

\\bigskip

Click on \\strong{Random} to explore.  To find things, type something in
the search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow},
then type Ctrl-ENTER or Ctrl-RETURN.


\\bigskip
\\strong{localhost:8000} is made with \\href{http://elm-lang.org/}{Elm}.


\\bigskip
\\strong{Sample documents}
\\begin{itemize}
  \\item \\href{https://localhost:8000/424}{Quantum Field Theory Notes}
  \\item \\href{https://localhost:8000/365}{Visual Literacy}
  \\item \\href{https://localhost:8000/754}{Butterfly}
  \\item \\href{https://localhost:8000/346}{Metal}
\\end{itemize}


Check out the \\href{https://jxxcarlson.github.io/app/miniLatexLive/index.html}{MiniLatex Live demo}
\\mdash no login needed.

\\medskip

If you have questions or comments about MiniLatex or localhost:8000, please contact
Jim Carlson: jxxcarlson at gmail.


\\bigskip

\\bigskip
"""


newUserText =
    """
Welcome!

\\begin{itemize}

\\item Click on \\strong{Home} to go to your home page.

\\item Click on \\strong{Random} to explore.

\\item To find things, type something in
the search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow}.

\\item To create or edit a document, click on \\strong{Write}.

\\end{itemize}


\\bigskip

\\image{https://noteimages.s3.amazonaws.com/app_images/vintage-typewriter-in-black-and-white-lynn-langmade.jpg}{}{width: 450}
"""


welcomeText =
    """
\\section{Getting started}

Type something in the search box, upper left, to find a document.
Or press the \\strong{Random} button.

\\section{Search Tips}

\\begin{enumerate}

\\item Type words or fragments of words to search by title.
For example, type \\strong{atom}.  If you wanted to be
more specific, you could type \\strong{hydrogen atom},
or for that mattter \\strong{ato hy}.

\\item Every document has a numerical ID, like a person's
social security number. You can type the ID in the search
box to find a document.   If someone says, "My class notes
are on document \\strong{440} at localhost:8000,"" you
know what to do.

\\item To find all the public articles by an author
with user name \\italic{jxxcarlson}, Use
the search term \\strong{author=jxxcarlson}.
For all the articles by that author with title
including \\italic{haskell}, search on
\\strong{author=jxxcarlson, title=haskell}.

\\item You can do full text searches.  For example,
\\strong{text=atom} finds documents with \\italic{atom}
in the text.  The search \\strong{text=atom, text=oscillator}
finds those texts that also contain the word \\italic{oscillator}.

\\item Click the \\strong{Random} button to produce
a  list of random documents.


\\end{enumerate}

There is more to searching, but this is enough for now.....

\\section{About kNode}

\\strong{kNode.io} is an app for sharing your knowledge
 with others.  With the kNode Reader,
 you can read what others write without signing in.
 To keep track of what you are reading or to
 write your own content to distribute on kNode.io,
 sign up for an account. You can write in
 plain text, Markdown, Asciidoc, or MiniLatex.

 For questions or comments, contact jxxcarlson at gmail.

"""
