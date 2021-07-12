#!/usr/bin/python3
# -*- coding:utf8 -*-


from os import listdir
from os.path import splitext, join
import markdown
import yaml
import json


def read(uri):
	with open(uri, 'r') as f:
		return f.read()

def text_to_yml_md(tex):
	tex = tex.strip('-')
	sep = '---'
	if sep in tex:
		return tex.split(sep)
	else:
		return (None, tex)


def extract_info(path, mode, keys): 
	list_files = listdir(path)
	resp = {}
	for file in list_files:
		n, e = splitext(file)
		if mode == 'yaml':
			info = yaml.safe_load(read(join(path, file)))
		if mode == 'markdown':
			yml, md = text_to_yml_md(read(join(path, file)))
			info = yaml.safe_load(yml)
		for k in keys:
			if not n in resp:
				resp[n] = {}
			if k in info:
				resp[n][k] = info[k]
	return resp

def main():
	file_dat = '../docs/cfg/menu-automatic.yml'
	data = {
		'texts': extract_info('../docs/texts/', 'yaml', ['title']),
	}
	with open(file_dat, 'w') as f:
		f.write(yaml.safe_dump(data))

if __name__ == '__main__':
	main()