SELECT 
    b.name AS 'nombre_beneficiario',
    g.name AS 'nombre_grupo', g.day AS 'dia',
    c.name AS 'nombre_comunidad',
    a.familyId AS 'folio', a.date AS 'fecha', a.totalPrice AS 'producto_extra'
FROM attendances a
LEFT JOIN beneficiary b ON a.familyId = b.id
LEFT JOIN communityGroup g ON g.id = b.group_id
LEFT JOIN community c ON c.id = g.communityId
WHERE a.attended = 1 AND b.name IS NOT NULL
AND a.totalPrice IS NOT NULL
AND a.date BETWEEN '2022-06-11 00:00:00' and '2022-06-17 00:00:00'
AND c.name = 'VERGEL' 
AND g.name = 'VEGEL MARTES'
;