# Évaluations

## Critères

En plus des exigences spécifiques à chaque évaluation, le code que vous
soumettez est évalué selon les critères de qualité ci-dessous.

-   Lisibilité du code

    -   le code est exempt de variables et de fonctions inutilisées
    -   l'utilisation des espaces est constante
    -   les lignes ne dépassent pas 80 caractères
    -   les noms de variables et de fonctions sont descriptifs
    -   des noms sont donnés aux valeurs constantes
    -   des commentaires sont présents là où nécessaire
    -   les fonctions sont bien documentées

-   Conception du programme

    -   le programme est décomposé en parties logiques
    -   les interfaces sont propres et bien encapsulées
    -   les algorithmes appropriés sont utilisés et codés proprement
    -   le code commun est unifié, non dupliqué
    -   les fonctions sont bien testées

-   Structures de données

    -   les structures de données sont appropriées
    -   pas de variables globales

-   Gestion de version

    -   les messages sont conformes au format conventionnel
    -   l'historique est propre
    -   les instantanés inclus seulement des changements connexes

## Remise

Toutes les évaluations pour ce cours doivent être remises sur GitHub,
dans des dépôts Classroom créés spécifiquement à cet effet. Vous
trouverez les adresses URL pour créer ces dépôts dans les énoncés des
évaluations.

### Formatage et analyse statique

Avant d'être déposées, les évaluations doivent être formatées avec la
commande `deno fmt`. Vous serez pénalisé·es si ce n'est pas fait.

Il vous est également recommandé d'exécuter la commande `deno lint` et
de régler les erreurs affichées, s'il y a.

### Fichiers inclus

La majorité des dépôts pour les évaluations inclue des fichiers de
configuration ou du code source de démarrage. La façon la plus simple
d'accéder à ces ressources est de cloner le dépôt Classroom *avant* de
commencer une évaluation.

Pour ce faire, à partir de la ligne de commande, déplacez-vous dans un
répertoire où seront sauvegardées toute les évaluations du cours.

```sh
mkdir evaluations
cd evaluations
```

Ensuite, clonez votre dépôt Classroom en exécutant la commande
ci-dessous. L'adresse URL sera différente pour chaque élève et pour
chaque évaluation.

```sh
git clone https://classroom.github.com/exemple
```

Si la commande est réussie, Git aura créé un nouveau répertoire (votre
dépôt) qui porte votre nom ainsi que le titre de l'évaluation.
Assurez-vous de toujours travaillez dans ce nouveau répertoire, et de ne
pas cloner d'autres dépôts dans celui-ci.

Pour soumettre l'évaluation, il suffit de pousser vos changements avec
`git push`.

## Authentification GitHub

Il se peut qu'un message d'erreur apparaissent lorsque vous tentez de
cloner un dépôt GitHub Classroom. Si c'est le cas, c'est probablement
que votre environnement n'est pas authentifié auprès de GitHub. Puisque
les dépôts pour les évaluations sont privés, vous devez vous
authentifier pour les cloner.

La façon la plus simple de s'authentifier est d'utiliser la commande
`gh`. Vous devrez télécharger celle-ci avec votre gestionnaire de
paquets.

Windows :

```sh
scoop install gh
```

Mac :

```sh
scoop install gh
```

Une fois `gh` installé, la commande `gh auth login` permettra de vous
authentifier.

