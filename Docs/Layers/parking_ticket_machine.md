[//]: # (WARNING: this file is automatically generated. Please find the sources at the bottom and edit those sources)

 parking_ticket_machine 
========================



<img src='https://mapcomplete.osm.be/square:white;./assets/layers/parking_ticket_machine/parking_tickets.svg' height="100px"> 

Layer with parking ticket machines to pay for parking.






  - This layer is shown at zoomlevel **16** and higher




#### Themes using this layer 





  - [parkings](https://mapcomplete.osm.be/parkings)
  - [personal](https://mapcomplete.osm.be/personal)




 Basic tags for this layer 
---------------------------



Elements must have the all of following tags to be shown on this layer:



  - <a href='https://wiki.openstreetmap.org/wiki/Key:amenity' target='_blank'>amenity</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dvending_machine' target='_blank'>vending_machine</a>
  - <a href='https://wiki.openstreetmap.org/wiki/Key:vending' target='_blank'>vending</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:vending%3Dparking_tickets' target='_blank'>parking_tickets</a>


[Execute on overpass](http://overpass-turbo.eu/?Q=%5Bout%3Ajson%5D%5Btimeout%3A90%5D%3B(%20%20%20%20nwr%5B%22amenity%22%3D%22vending_machine%22%5D%5B%22vending%22%3D%22parking_tickets%22%5D(%7B%7Bbbox%7D%7D)%3B%0A)%3Bout%20body%3B%3E%3Bout%20skel%20qt%3B)



 Supported attributes 
----------------------



Warning: 

this quick overview is incomplete



attribute | type | values which are supported by this layer
----------- | ------ | ------------------------------------------
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/payment:coins:denominations#values) [payment:coins:denominations](https://wiki.openstreetmap.org/wiki/Key:payment:coins:denominations) | Multiple choice | [0.01 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.01 EUR) [0.02 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.02 EUR) [0.05 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.05 EUR) [0.10 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.10 EUR) [0.20 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.20 EUR) [0.50 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D0.50 EUR) [1 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D1 EUR) [2 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:coins:denominations%3D2 EUR)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/payment:notes:denominations#values) [payment:notes:denominations](https://wiki.openstreetmap.org/wiki/Key:payment:notes:denominations) | Multiple choice | [5 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D5 EUR) [10 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D10 EUR) [20 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D20 EUR) [50 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D50 EUR) [100 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D100 EUR) [200 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D200 EUR) [500 EUR](https://wiki.openstreetmap.org/wiki/Tag:payment:notes:denominations%3D500 EUR)
[<img src='https://mapcomplete.osm.be/assets/svg/statistics.svg' height='18px'>](https://taginfo.openstreetmap.org/keys/ref#values) [ref](https://wiki.openstreetmap.org/wiki/Key:ref) | [string](../SpecialInputElements.md#string) | 




### images 



This block shows the known images which are linked with the `image`-keys, but also via `mapillary` and `wikidata`

This tagrendering has no question and is thus read-only





### payment-options-split 



The question is  *Which methods of payment are accepted here?*





  - *Cash is accepted here*  corresponds with  `payment:cash=yes`
  - This option cannot be chosen as answer
  - Unselecting this answer will add 
  - *Payment cards are accepted here*  corresponds with  `payment:cards=yes`
  - This option cannot be chosen as answer
  - Unselecting this answer will add 
  - *Payment by QR-code is possible here*  corresponds with  `payment:qr_code=yes`
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:qr_code' target='_blank'>payment:qr_code</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:qr_code%3Dno' target='_blank'>no</a>
  - *Coins are accepted here*  corresponds with  `payment:coins=yes`
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:coins' target='_blank'>payment:coins</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:coins%3Dno' target='_blank'>no</a>
  - *Bank notes are accepted here*  corresponds with  `payment:notes=yes`
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:notes' target='_blank'>payment:notes</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:notes%3Dno' target='_blank'>no</a>
  - *Debit cards are accepted here*  corresponds with  `payment:debit_cards=yes`
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment_debit_cards' target='_blank'>payment_debit_cards</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment_debit_cards%3Dno' target='_blank'>no</a>
  - *Credit cards are accepted here*  corresponds with  `payment:credit_cards=yes`
  - Unselecting this answer will add <a href='https://wiki.openstreetmap.org/wiki/Key:payment:credit_cards' target='_blank'>payment:credit_cards</a>=<a href='https://wiki.openstreetmap.org/wiki/Tag:payment:credit_cards%3Dno' target='_blank'>no</a>




### denominations-coins 



The question is  *What coins can you use to pay here?*





  - *1 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.01 EUR`
  - *2 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.02 EUR`
  - *5 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.05 EUR`
  - *10 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.10 EUR`
  - *20 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.20 EUR`
  - *50 cent coins are accepted*  corresponds with  `payment:coins:denominations=0.50 EUR`
  - *1 euro coins are accepted*  corresponds with  `payment:coins:denominations=1 EUR`
  - *2 euro coins are accepted*  corresponds with  `payment:coins:denominations=2 EUR`


This tagrendering is only visible in the popup if the following condition is met: `payment:coins=yes|payment:cash=yes&_country=at|_country=be|_country=cy|_country=de|_country=ee|_country=es|_country=fi|_country=fr|_country=gr|_country=hr|_country=ie|_country=it|_country=lt|_country=lu|_country=lv|_country=mt|_country=nl|_country=pt|_country=si|_country=sk`



### denominations-notes 



The question is  *what notes can you use to pay here?*





  - *5 euro notes are accepted*  corresponds with  `payment:notes:denominations=5 EUR`
  - *10 euro notes are accepted*  corresponds with  `payment:notes:denominations=10 EUR`
  - *20 euro notes are accepted*  corresponds with  `payment:notes:denominations=20 EUR`
  - *50 euro notes are accepted*  corresponds with  `payment:notes:denominations=50 EUR`
  - *100 euro notes are accepted*  corresponds with  `payment:notes:denominations=100 EUR`
  - *200 euro notes are accepted*  corresponds with  `payment:notes:denominations=200 EUR`
  - *500 euro notes are accepted*  corresponds with  `payment:notes:denominations=500 EUR`


This tagrendering is only visible in the popup if the following condition is met: `payment:notes=yes|payment:cash=yes&_country=at|_country=be|_country=cy|_country=de|_country=ee|_country=es|_country=fi|_country=fr|_country=gr|_country=hr|_country=ie|_country=it|_country=lt|_country=lu|_country=lv|_country=mt|_country=nl|_country=pt|_country=si|_country=sk`



### ref 



The question is  *What is the reference number of this parking ticket machine?*

This rendering asks information about the property  [ref](https://wiki.openstreetmap.org/wiki/Key:ref) 

This is rendered with  `This parking ticket machine has the reference number {ref}`





  - *This parking ticket machine has no reference number*  corresponds with  `noref=yes`
 

This document is autogenerated from [assets/layers/parking_ticket_machine/parking_ticket_machine.json](https://github.com/pietervdvn/MapComplete/blob/develop/assets/layers/parking_ticket_machine/parking_ticket_machine.json)
