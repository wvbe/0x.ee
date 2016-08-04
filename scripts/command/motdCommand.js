import AskNicely from 'ask-nicely';

import React, {Component} from 'react';

function motdController(req, res) {
	res.log('');
	(`                       .ed"""" """$$$$be.
                     -"           ^""**$$$e.
                   ."                   '$$$c
                  /                      "4$$b
                 d  3                     $$$$
                 $  *                   .$$$$$$
                .$  ^c           $$$$$e$$$$$$$$.
                d$L  4.         4$$$$$$$$$$$$$$b
                $$$$b ^ceeeee.  4$$ECL.F*$$$$$$$
    e$""=.      $$$$P d$$$$F $ $$$$$$$$$- $$$$$$
   z$$b. ^c     3$$$F "$$$$b   $"$$$$$$$  $$$$*"      .=""$c
  4$$$$L   \     $$P"  "$$b   .$ $$$$$...e$$        .=  e$$$.
  ^*$$$$$c  %..   *c    ..    $$ 3$$$$$$$$$$eF     zP  d$$$$$
    "**$$$ec   "\   %ce""    $$$  $$$$$$$$$$*    .r" =$$$$P""
          "*$b.  "c  *$e.    *** d$$$$$"L$$    .d"  e$$***"
            ^*$$c ^$c $$$      4J$$$$$% $$$ .e*".eeP"
               "$$$$$$"'$=e....$*$$**$cz$$" "..d$*"
                 "*$$$  *=%4.$ L L$ P3$$$F $$$P"
                    "$   "%*ebJLzb$e$$$$$b $P"
                      %..      4$$$$$$$$$$ "
                       $$$e   z$$$$$$$$$$%
                        "*$c  "$$$$$$$P"
                         ."""*$$$$$$$$bc
                      .-"    .$***$$$"""*e.
                   .-"    .e$"     "*$c  ^*b.
            .=*""""    .e$*"          "*bc  "*$e..
          .$"        .z*"               ^*$e.   "*****e.
          $$ee$c   .d"                     "*$.        3.
          ^*$E")$..$"                         *   .ee==d%
             $.d$$$*                           *  J$$$e*
              """""                             "$$$"`)
	.split('\n').forEach(line => res.log(line));

	res.log('');
	res.log('---------------------------------------------------------------');
	res.log(`  YOU HAVE REACHED THE PORTFOLIO SITE OF WYBE MINNEBO`);
	res.log(`  interaction designer, javascript developer and what have you`);
	res.log('---------------------------------------------------------------');
	res.log('');
	res.log(`Welcome to 0x.ee v 3.0-rc1, it has regenerative javascript and extra-futuristic flavour.`);
	res.log(`Though the command line interface doesn't feel as HTML5 as it actually is, CLI is the most powerful way of communicating with a 'puter.`);
}

export default (app) => {
	app.console.addCommand('motd', motdController);
}