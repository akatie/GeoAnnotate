#!/usr/bin/python

import argparse
import os
import re

# This is for processing War of the Rebellion HTML in the form where
# the entire volume is a single HTML file.
parser = argparse.ArgumentParser(description='Process War of The Rebellion HTML')
parser.add_argument('files', nargs='*',
                   help='files to process')

args = parser.parse_args()
for file in args.files:
  m = re.match(".* ([0-9]+) ", file)
  if not m:
    print "Unable to process volume number in file, skipping: %s" % file
    continue
  vol = m.group(1)
  print "Processing volume: %s" % vol
  outtext = open(vol + ".txt", "w")
  start = False
  lines = []
  for line in open(file, "r"):
    if start:
      lines.append(line)
    if start and re.match('.*</div>', line):
      start = False
      text = ''.join(lines)
      text = text.replace("</p>\n<p>\n", "\n")
      text = text.replace("<p>", "")
      text = text.replace("</p>", "")
      text = text.replace("<br />", "\n")
      text = text.replace("<br>", "\n")
      text = re.sub("<[^>]*>", "", text)
      while text.endswith("\n\n"):
        text = text[0:-1]
      outtext.write(text)
      outtext.write("PAGEBREAK\n")
      lines = []
    if re.match('.*<div class="field-item ', line):
      start = True
  outtext.close()
