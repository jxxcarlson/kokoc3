module LatexHelper exposing (makeDocument)


makeDocument : String -> String
makeDocument content =
    latexPreamble ++ "\n\n" ++ content ++ "\n\n\\end{document}"


latexPreamble =
    """
\\documentclass[10pt, oneside]{article}
\\usepackage{geometry}
\\geometry{letterpaper}

\\usepackage{graphicx}
\\usepackage{wrapfig}
\\graphicspath{ {images/} }

\\usepackage{amssymb}
\\usepackage{amsmath}
\\usepackage{hyperref}
\\hypersetup{
  colorlinks=true,
  linkcolor=blue,
  filecolor=magenta,
  urlcolor=blue,
}

%SetFonts

%SetFonts

%%%%%%
\\newcommand{\\code}[1]{{\\tt #1}}
\\newcommand{\\ellie}[1]{\\href{#1}{Link to Ellie}}
% \\newcommand{\\image}[3]{\\includegraphics[width=3cm]{#1}}

\\newcommand{\\mdash}{---}
\\newcommand{\\ndash}{--}
\\newcommand{\\bs}[1]{$\\backslash$#1}
\\newcommand{\\texarg}[1]{\\{#1\\}}

\\newcommand{\\imagecenter}[3]{{
\\centering
  \\includegraphics[width=#3]{#1}
  \\vglue-10pt \\par {#2}
}}


\\newcommand{\\imagefloatright}[3]{
\\begin{wrapfigure}{R}{0.30\\textwidth}
\\includegraphics[width=#3]{#1}
\\caption{#2}
\\end{wrapfigure}
}

\\newcommand{\\imagefloatleft}[3]{
\\begin{wrapfigure}{L}{0.3-\\textwidth}
\\includegraphics[width=#3]{#1}
\\caption{#2}
\\end{wrapfigure}
}


\\newcommand{\\italic}[1]{{\\sl #1}}
\\newcommand{\\strong}[1]{{\\bf #1}}
\\newcommand{\\subheading}[1]{{\\bf #1}\\par}
\\newcommand{\\xlinkPublic}[2]{\\href{{http://www.knode.io/\\#@public#1}}{#2}}

\\newcommand{\\bibhref}[3]{[#3] \\href{#1}{#2}}

\\newtheorem{theorem}{Theorem}
\\newtheorem{axiom}{Axiom}
\\newtheorem{lemma}{Lemma}
\\newtheorem{proposition}{Proposition}
\\newtheorem{corollary}{Corollary}
\\newtheorem{definition}{Definition}
\\newtheorem{example}{Example}
\\newtheorem{exercise}{Exercise}
\\newtheorem{problem}{Problem}
\\newtheorem{exercises}{Exercises}


%%%
%%%
\\newcommand{\\term}[1]{{\\sl #1}}
\\newtheorem{remark}{Remark}

%% Null commands in MiniLatex
\\newcommand{\\innertableofcontents}[1]{}
\\newcommand{\\setdocid}[1]{}   %% Needed?
\\newcommand{\\setclient}[1]{}  %% Needed?

\\parindent0pt
\\parskip10pt

\\begin{document}
"""