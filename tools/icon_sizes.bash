#!/bin/bash
# -*- coding:utf8 -*-

R='../docs/img/'
A='favicon_256.png'

convert $R$A -filter Lanczos -resize 60x60 $R'favicon_60.png' 
convert $R$A -filter Lanczos -resize 76x76 $R'favicon_76.png' 
convert $R$A -filter Lanczos -resize 120x120 $R'favicon_120.png' 
convert $R$A -filter Lanczos -resize 152x152 $R'favicon_152.png' 
convert $R$A -filter Lanczos -resize 128x128 $R'../favicon.ico' 