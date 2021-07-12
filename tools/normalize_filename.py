#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from os import chdir, curdir, rename, listdir
from os.path import isfile, splitext, basename, realpath
from sys import argv


class Normalizar():
    SIGNOS_A_REEMPLAZAR = [
        ['ñ', 'nn'],
        ['á', 'a'],
        ['é', 'e'],
        ['í', 'i'],
        ['ó', 'o'],
        ['ú', 'u'],
    ]
    SIGNOS_A_PERMITIDOS = 'abcdefghijklmnopqrstuvwxyz1234567890_'
    SIGNO_PARA_NO_PERMITIDOS = '_'

    def reemplazos(self, t):
        for r in self.SIGNOS_A_REEMPLAZAR:
            t = t.replace(r[0], r[1])
        return t
        
    def permitidos(self, t):
        r = []
        for s in t:
            if not s in self.SIGNOS_A_PERMITIDOS:
                s = self.SIGNO_PARA_NO_PERMITIDOS
            r.append(s)
        return ''.join(r)

    def quitar_duplicados_no_permitidos(self, t):
        for i in range(3):
            t = t.replace(self.SIGNO_PARA_NO_PERMITIDOS * 2, self.SIGNO_PARA_NO_PERMITIDOS)
        return t

    def ajustar(self, t):
        t = t.lower()
        t = self.reemplazos(t)
        t = self.permitidos(t)
        t = self.quitar_duplicados_no_permitidos(t)
        t = t.strip(self.SIGNO_PARA_NO_PERMITIDOS)
        return t

def main():
    ru = realpath(curdir)
    norm = Normalizar()
    form = '{}.{}'
    for no in listdir(ru):
        nom, ext = splitext(basename(no))
        naj = norm.ajustar(nom) 
        nex = norm.ajustar(ext)
        nn = form.format(naj, nex)
        while isfile('./{}'.format(nn)) and not nn == no:
            naj = '{}-'.format(naj)
            nn = form.format(naj, nex)
        rename(no, nn)
        
if __name__ == '__main__':
    if len(argv) > 1:
        chdir(realpath(argv[1]))
    main()