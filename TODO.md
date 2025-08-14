## Agregar sección "gestión de usuarios" en el sidebar.
## Agregar funcionalidad de gastos.
## Siempre mirar que las features son mobile friendly.

## UN USUARIO PUEDE TENER VARIOS ROLES. POR ENDE, TENDRÁ VARIOS PERFILES O INFO RELEVANTE. SI ES PACIENTE, VA A TENER HISTORIA CLÍNICA Y ESO. SI ES CONTADOR, NO. VER CÓMO SE MANEJA ESO...

## COMO el auth.user de Supabase no puedo modificar, tengo que relacionar una tabla mía tipo "profile" o algo así, con el auth.user.id de Supabase, cuando se crea, updatea o elimina un user.

## IMPLEMENTAR KEYS FACTORY PARA LAS KEYS DE REACT-QUERY.

## Agregar testing a cosas básicas y utils.

## Agregar lazy loading al routing.

## Agregar bot que hace reviews a mis PRs.

## Agregar CI/CD, previews y Docker más adelante.

## Agregar Storybook.


PRÓXIMOS TODO:
- Hacer un spike sobre cómo debería manejar el profile, roles y los distintos datos que puede tener cada profile. ver cómo debería qeudar.
- Plantear una solución para eso.
- Independientemente de la solución, si o sí hay que relacionar ese dato, con el user del schema.auth de Supabase. Luego todo lo relacionado a ROLES va a venir de esa data.
- Una vez implementado perfiles con roles + rutas limitadas a los roles + redirect en base a roles o selectedRole + sección "gestión de usuarios" para admin, probar PROFUNDAMENTE que funciona bien todo el tema de routing limitado por public, private y por roles. Ver si se puede hacer con testing.
- Ver cómo manejar cuando un usuario tiene varias orgs y varios roles. Si le permito cambiar dinámicamente, o le pregunto al inicio y yá!