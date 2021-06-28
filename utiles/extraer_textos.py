#!/usr/bin/python3
# -*- coding:utf8 -*-

import pandas as pd 
from sys import argv

def main(ar):
	doc = pd.ExcelFile(ar)
	for pag in doc.sheet_names:
		print(pag)
		ar_exp = f'{pag}.yml'
		df = doc.parse(pag)
		df.fillna('', inplace=True)

		dic = {}
		for i in range(len(df)):
		    par = {}
		    for c in df.columns:
		        par[c] = df[c][i]

		    dic[i] = par

		tex = []
		tex.append(f'titulo: "{pag}"')
		tex.append(f'textos:')

		s = ' '*4
		for k in dic.keys():
			tex.append(f'{s*1}-')
			for i in dic[k].keys():
				tex.append(f'{s*2}{i}: |\n{s*3}{dic[k][i]}')

		with open(ar_exp, 'w') as f:
			f.write('\n'.join(tex))


if __name__ == '__main__':
	main(argv[1])