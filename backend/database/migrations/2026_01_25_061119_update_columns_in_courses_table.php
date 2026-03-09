<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            // decimal → double
            $table->double('price')->nullable()->change();
            $table->double('cross_price')->nullable()->change();

            // boolean → integer
            $table->integer('status')->default(0)->change();

            // boolean → enum
            $table->enum('is_featured', ['yes', 'no'])->default('no')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->nullable()->change();
            $table->decimal('cross_price', 10, 2)->nullable()->change();

            $table->boolean('status')->default(0)->change();

            $table->boolean('is_featured')->default(0)->change();
        });
    }
};
