<?php
/*
* Template Name: Case Study
*/

  $type = 'FLOATING';
  include(locate_template('templates/modules/header.php'));
  get_template_part('templates/modules/header');
  get_template_part('templates/modules/simple-portfolio-entry-modules/hero');
	get_template_part('templates/modules/simple-portfolio-entry-modules/problem-solution');
  get_template_part('templates/modules/simple-portfolio-entry-modules/functionalities');
  get_template_part('templates/modules/simple-portfolio-entry-modules/similar-case-studies');
  get_template_part('templates/modules/hire-us');
	get_template_part('templates/modules/footer-homepage');
?>
