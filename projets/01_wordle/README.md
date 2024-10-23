# Projet 1 : Wordle

> Pondération : 20% \
> Remise : 5 novembre

[Wordle][] est un jeu où le but est de deviner un mot spécifique de cinq
lettres en un maximum de six tentatives. Après chaque essai, les lettres
données par le ou la joueuse sont coloriées pour identifier les lettres
qui ne se trouvent pas dans le mot recherché (gris), les lettre qui se
trouvent ailleurs dans le mot (jaune), et les lettre qui sont à la bonne
place (vert). Si l'essai contient plusieurs fois la même lettre, mais
que le mot contient seulement une fois la lettre, alors seule une lettre
est coloriée. Les lettres de l'essai doivent former un mot valide.

[Wordle]: https://www.nytimes.com/games/wordle/index.html

## Exigences

Concevez un programme TypeScript pour jouer à Wordle dans le navigateur.

-   La page web doit permettre au joueur ou à la joueuse d'entrer son
    essai avec le clavier. Les lettres doivent s'afficher dans des cases
    différentes. Après avoir entré une lettre, le point d'insertion doit
    automatiquement se déplacer vers la prochaine case sur la ligne. 

-   Pour soumettre un essai, le ou la joueuse peut soit cliquer sur un
    bouton, soit appuyer sur la touche `return` de leur clavier. L'essai
    est alors validé, et les cases sont coloriées correctement. 

-   Si toutes les cases sont vertes, et que le ou joueuse a deviné le
    mot, un message félicitant celui ou celle-ci apparaît.

-   Si l'essai est incorrect, et que ce n'est pas le dernier essai,
    alors le point d'insertion est automatiquement placé sur la première
    case de la prochaine rangée. S'il ne reste pas d'essai, un message
    s'affiche invitant le ou la joueuse à réessayer de nouveau demain.

-   Les cases de l'essai en cours doivent être identifiées visuellement.
    Le joueur ou la joueuse ne doit pas pouvoir interagir avec les
    autres cases.

-   Si les lettres d'un essai ne forment pas un mot valide, alors un
    message doit en aviser le ou la joueuse. Le fichier ci-joint
    `server.go` contient un serveur capable de valider un `word` envoyé
    en format `application/x-www-form-urlencoded` dans un requête POST
    dont le chemin est `/api/validate`. Une réponse `422` sera retournée
    si le mot est invalide. Pour lancer le serveur, utilisez la commande
    `go run server.go`. Le serveur peut également servir les fichiers se
    trouvant dans le répertoire courant.

-   Pour obtenir le mot à deviner, envoyez une requête GET ayant le
    chemin `/api/word`. Le mot se trouvera dans le corps de la réponse.
    Par défaut, le mot est « *apple* ». Vous pouvez donner un autre mot
    lorsque vous lancez le serveur : `go run server.go -word=hello`.

-   La grille de jeu doit s'afficher correctement, même si JavaScript
    n'est pas exécuté. Éventuellement, on veut pouvoir faire en sorte
    que JavaScript ne soit pas obligatoire pour jouer, même si ce n'est
    pas le cas présentement. Les balises HTML utilisées doivent donc
    permettre aux joueurs·ses de soumettre leurs essais comme un
    formulaire standard.

-   Libre à vous de suivre l'approche orientée objet, mais rappelez-vous
    que l'implémentation d'un objet ne devrait pas dépendre de la
    structure du document HTML. Il en va de même pour la logique métier.

-   La validation des essais doit être testée automatiquement à l'aide
    de tests unitaires. Assurez-vous de tester les différents scénarios
    possibles.

## Remise

Le programme doit être remis dans un dépôt GitHub Classroom crée à cet
effet. Pour créer le dépôt, cliquez [ici][GitHub Classroom].

[GitHub Classroom]: https://classroom.github.com/a/zQ796ODj

