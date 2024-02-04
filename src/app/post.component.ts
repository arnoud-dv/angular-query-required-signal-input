import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  input,
} from "@angular/core";
import { injectQuery } from "@tanstack/angular-query-experimental";
import { fromEvent, lastValueFrom, takeUntil } from "rxjs";
import { PostsService } from "./posts-service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "post",
  standalone: true,
  templateUrl: "./post.component.html",
})
export class PostComponent {
  #postsService = inject(PostsService);

  @Output() setPostId = new EventEmitter<number>();

  // This signal input being required causes an error:
  // ERROR Error: NG0950: Input is required but no value is available yet. Find more at https://angular.io/errors/NG0950
  postId = input.required<number>();

  postQuery = injectQuery(() => ({
    enabled: this.postId() > 0,
    queryKey: ["post", this.postId()],
    queryFn: async (context) => {
      // Cancels the request when component is destroyed before the request finishes
      const abort$ = fromEvent(context.signal, "abort");
      return lastValueFrom(
        this.#postsService.postById$(this.postId()).pipe(takeUntil(abort$)),
      );
    },
  }));
}
