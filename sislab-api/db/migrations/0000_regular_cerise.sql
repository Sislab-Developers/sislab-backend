CREATE TABLE "class_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"lab_id" integer,
	"major_id" integer,
	"course_id" integer,
	"number_of_students" integer NOT NULL,
	"number_of_teams" integer NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_id" integer,
	"period" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"user_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "equipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experiment_equipment" (
	"equipment_id" integer NOT NULL,
	"experiment_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experiment_reagents" (
	"reagent_id" integer NOT NULL,
	"experiment_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"unit" varchar(5) NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "experiment_wastes" (
	"waste_id" integer NOT NULL,
	"experiment_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "experiments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"experiment_number" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "lab_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"group_id" integer,
	"experiment_id" integer,
	"request_date" timestamp with time zone NOT NULL,
	"handled_by_user_id" integer,
	"handled_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "labs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(10) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "majors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reagents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"chemical_notation" varchar NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "request_comments" (
	"request_id" integer NOT NULL,
	"comment_id" integer,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "request_wastes" (
	"waste_id" integer NOT NULL,
	"request_id" integer NOT NULL,
	"quantity" integer,
	"unit" varchar(5),
	"omitted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "request_equipment" (
	"equipment_id" integer NOT NULL,
	"request_id" integer NOT NULL,
	"omitted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "request_reagents" (
	"reagent_id" integer NOT NULL,
	"request_id" integer NOT NULL,
	"quantity" integer,
	"unit" varchar(5),
	"omitted" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"is_active" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "wastes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "class_groups" ADD CONSTRAINT "class_groups_lab_id_labs_id_fk" FOREIGN KEY ("lab_id") REFERENCES "public"."labs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_groups" ADD CONSTRAINT "class_groups_major_id_majors_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."majors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_groups" ADD CONSTRAINT "class_groups_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "class_groups" ADD CONSTRAINT "class_groups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_equipment" ADD CONSTRAINT "experiment_equipment_equipment_id_equipment_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_equipment" ADD CONSTRAINT "experiment_equipment_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_reagents" ADD CONSTRAINT "experiment_reagents_reagent_id_reagents_id_fk" FOREIGN KEY ("reagent_id") REFERENCES "public"."reagents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_reagents" ADD CONSTRAINT "experiment_reagents_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_wastes" ADD CONSTRAINT "experiment_wastes_waste_id_wastes_id_fk" FOREIGN KEY ("waste_id") REFERENCES "public"."wastes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiment_wastes" ADD CONSTRAINT "experiment_wastes_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_requests" ADD CONSTRAINT "lab_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_requests" ADD CONSTRAINT "lab_requests_group_id_class_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."class_groups"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_requests" ADD CONSTRAINT "lab_requests_experiment_id_experiments_id_fk" FOREIGN KEY ("experiment_id") REFERENCES "public"."experiments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab_requests" ADD CONSTRAINT "lab_requests_handled_by_user_id_users_id_fk" FOREIGN KEY ("handled_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_comments" ADD CONSTRAINT "request_comments_request_id_lab_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."lab_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_comments" ADD CONSTRAINT "request_comments_comment_id_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."comments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_wastes" ADD CONSTRAINT "request_wastes_waste_id_wastes_id_fk" FOREIGN KEY ("waste_id") REFERENCES "public"."wastes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_wastes" ADD CONSTRAINT "request_wastes_request_id_lab_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."lab_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_equipment" ADD CONSTRAINT "request_equipment_equipment_id_equipment_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_equipment" ADD CONSTRAINT "request_equipment_request_id_lab_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."lab_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_reagents" ADD CONSTRAINT "request_reagents_reagent_id_reagents_id_fk" FOREIGN KEY ("reagent_id") REFERENCES "public"."reagents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "request_reagents" ADD CONSTRAINT "request_reagents_request_id_lab_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."lab_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;