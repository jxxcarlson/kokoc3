module Configuration
    exposing
        ( backend
        , client
        , autosaveDuration
        , debounceDelay
        , coverArtUrl
        , userManualId
        , basicDocumentText
        , newDocumentTitle
        , newMiniLatexDocumentText
        , sampleDocumentTitle
        , sampleMiniLatexDocumentText
        , newMasterDocumentTitle
        , newMasterDocumentText
        , newUserText
        , signInText
        , signedOutText
        , signedUpText
        , welcomeText
        , bucket
        , timeout
        , adminUsername
        , documentQueueCapacity
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


client : String
client =
    "http://localhost:8080"


documentQueueCapacity : Int
documentQueueCapacity =
    10


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
    1064



-- TEXT


signInText =
    """
This is knode.io, ready to run MiniLatex, Asciidoc, or Markdown.

\\[f(a) = \\frac{1}{2\\pi i} \\oint\\frac{f(z)}{z-a}dz\\]

Click on \\strong{Home} in the menu bar above to go to your home page.
Click on \\xlink{1064}{Manual} above for the manual.  Type \\strong{control-N}
to make a new document, or type \\strong{control-1} for a sample document.
"""


signedOutText : String
signedOutText =
    """
You are now signed out. See you later.
"""


signedUpText : String
signedUpText =
    """
Welcome to knode.io.  We are ready to run MiniLatex, Asciidoc, or Markdown for you

\\[f(a) = \\frac{1}{2\\pi i} \\oint\\frac{f(z)}{z-a}dz\\]

Click on \\strong{Home} in the menu bar above to go to your home page.
Click on \\xlink{1064}{Manual} above for the manual.
Click on \\strong{Write} to create or edit a document.
"""


newDocumentTitle =
    "New Document"


newMiniLatexDocumentText =
    """
\\section{New Document}

Edit this text, or wipe it out and start fresh.

Type \\strong{control-F} to do a full render of your document.
"""


sampleDocumentTitle =
    "Sample Document"


sampleMiniLatexDocumentText =
    """
\\section{Sample Document}

Edit this text, or wipe it out and
start fresh.  Type \\strong{control-F} to
do a full render of your document.

\\section{Introduction}

An inline formula, by Pythogoras: $a^2 + b^2 = c^2$.

A displayed formula, by Cauchy:

\\begin{equation}
\\label{eq:cauchy}
  f(a) = \\frac{1}{2\\pi i} \\oint\\frac{f(z)}{z-a}dz
\\end{equation}

\\section{More stuff}

\\begin{theorem}
There are infinitely many primes $p \\equiv 1 (4)$.
\\end{theorem}

Hmmm ... I refer you to equation \\ref{eq:cauchy}.

\\image{https://www.storyofmathematics.com/images2/riemann.jpg}{B. Riemann}{float: left, width: 300}
Bernhard Riemann's life was short, but amazingly creative and productive.  From \\href{https://en.wikipedia.org/wiki/Bernhard_Riemann}{Wikipedia}:
\\italic{17 September 1826 – 20 July 1866) was a German mathematician who made contributions to analysis, number theory, and differential geometry. In the field of real analysis, he is mostly known for the first rigorous formulation of the integral, the Riemann integral, and his work on Fourier series. His contributions to complex analysis include most notably the introduction of Riemann surfaces, breaking new ground in a natural, geometric treatment of complex analysis. His famous 1859 paper on the prime-counting function, containing the original statement of the Riemann hypothesis, is regarded as one of the most influential papers in analytic number theory. Through his pioneering contributions to differential geometry, Riemann laid the foundations of the mathematics of general relativity. He is considered by many to be one of a handful of greatest mathematicians of all time}
"""


newMasterDocumentTitle =
    "New Master Document"


newMasterDocumentText =
    """

Add new sections by using the text '== 1234'
to add the document with ID 1234.

Add one document per line.
"""


newMiniLatexDocumentText1 =
    """
\\tableofcontents

\\section{Examples}

This is a sample document with a few MiniLatex examples.
Click on \\strong{Edit attributes} to change the title
and other document attributes.

\\subsection{A formula}

\\[f(a) = \\frac{1}{2\\pi i} \\oint\\frac{f(z)}{z-a}dz\\]


\\subsection{An image}

\\image{http://noteimages.s3.amazonaws.com/uploads/butterfly.jpg}{}{width: 450}

\\subsection{A hyperlink}

\\href{\\https://nytimes.com}{The New York Times}
"""


basicDocumentText =
    """

This is \\strong{kNode.io}, a knowledge node, ready to run MiniLaTeX.

\\[f(a) = \\frac{1}{2\\pi i} \\oint\\frac{f(z)}{z-a}dz\\]

Write formulas, place images, etc.
Edit and publish LaTeX to the web in real time. Lecture notes, problem sets, whatever.
Click on \\strong{Home} in the menu bar above to go to your home page.
Click on \\strong{\\xlink{1064}{Manual}} above for the User Manual. Sign up
and type \\strong{control-N} to make a new document and get started writing.
You can also type \\strong{control-1} for a sample document.
   Recommended browser: \\strong{\\blue{Firefox}}.


\\medskip

\\image{https://noteimages.s3.amazonaws.com/app_images/vintage-typewriter-in-black-and-white-lynn-langmade.jpg}{}{width: 550}

\\medskip

Click on  \\strong{\\blue{Random}} to explore.  To find things, type something in
the search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow},
then press RETURN.


\\strong{kNode.io} is made with \\href{http://elm-lang.org/}{Elm},
\\href{https://jxxcarlson.github.io/app/miniLatexLive/index.html}{MiniLaTeX},
a subset of LaTeX that can be rendered to HTML, and \\href{https://mathjax.org}{MathJax}.

kNode also supports documents written in Asciidoc and Markdown.


\\subheading{Sample documents}

\\begin{itemize}
  \\item \\href{http://localhost:8080/424}{Quantum Field Theory Notes}
  \\item \\href{http://localhost:8080/365}{Visual Literacy}
  \\item \\href{http://localhost:8080/754}{Butterfly}
  \\item \\href{http://localhost:8080/346}{Metal}
\\end{itemize}


For other apps that use MiniLaTeX,
check out \\href{https://jxxcarlson.github.io/app/miniLatexLive/index.html}{MiniLatex Live}
or \\href{http://localhost:8080/reader2}{MiniLaTeX Reader}
\\mdash no login needed.

If you have questions or comments about MiniLatex or kNode.io, please contact
Jim Carlson: jxxcarlson at gmail.
"""


newUserText =
    """
Welcome!

We sent you a verification email \\mdash check it out, OK?

\\begin{itemize}

\\item Click on \\strong{Home} to go to your home page.

\\item Click on \\strong{Random} to explore.

\\item To find things, type something in
the search box, e.g., \\italic{matt}, \\italic{wave}, or \\italic{snow}.
Then do \\strong{ctrl-RETURN}.

\\item To create or edit a document, click on \\strong{Write}.

\\end{itemize}

Please contact jxxcarlson at gmail.com if you have questions or comments about this app.

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
are on document \\strong{440} at knode.io"" you
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
