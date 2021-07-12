#!/usr/bin/python3
# -*- coding:utf8 -*-

from os import listdir
from os.path import join
from sys import argv
import yaml


def dat(uri):
	return yaml.safe_load(open(uri, 'r'))

def main(uri):
	extension = '.yml'
	files = [f for f in listdir(uri) if f.endswith(extension)]
	for file in files:
		keys = list(dat(join(uri, file))['paragraphs'][0].keys())
		print('\n'.join(keys))


if __name__ == '__main__':
	yml_directory = argv[1] if len(argv) > 1 else '.'
	main(yml_directory)