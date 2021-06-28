# Tabla comparativa

Utilidad web, para comparar contenidos.


La información a comparar está almacenada en documentos con formato yml, para facilitar la edición principal.

Tanto párrafos como títulos aceptan notación markdown.

La configuración general, también se realiza mediante formato yml, en './cfg/menu.yml'.

Interactivamente puede conmutarse la visualizacipon de las categorías/idiomas comparados. 


## Utilidades extra de automatización

En la carpeta './utiles/' hay varios scripts para automatizar varios pasos del procesado de contenidos, desarrollados y testeados para usar en sistema operativo linux o similar.


## Uso particular (actual)

Si bien está utilizada actualmente para comparar textos traducidos en diversos lenguajes, puede emplearse para otros contenidos con mayor o menor estructura y carga gráfica _(no probado aún)_.


## FALTA
- Mejorar la estética general.
- Permitir ajuste de ancho de columnas y scroll horizontal.
- Establecer carga sincrinizada de contenidos.
- Permitir edición (título, párrafos, nombres de variantes). Mediante content-editable u otro método. 
- Generar-exportar yml con contenido editado.
- Probar variantes de representación y visualización de comparaciones.
- Realizar pruebas con otros contenidos.
- Permitir establecer un texto principal (ubicado al inicio) y seleccionar los otros contenidos de modo secundario.
- Hacer menu de utilidades siempre presente.
- Aislar el funcionamiento y las plantillas de contenido para poder transportarlo facilmente a otra aplicación.
