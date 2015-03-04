export default function() {
  this.transition(
    this.fromRoute(null),
    this.toRoute('collections'),
    this.use('fade')
  );
}
